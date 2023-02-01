import getFirstDayOfTheWeek from '../helpers/getFirstDayOfTheWeek'
import getSecondsByPeriodType from '../helpers/getSecondsByPeriodType'
import { InputGetCandles, CurrentWeeklyCandles } from '../types'

export default async function getCurrentWeeklyCandles(input: CurrentWeeklyCandles) {
  const firstDayOfTheWeek = getFirstDayOfTheWeek(new Date())
  const seconds = getSecondsByPeriodType(input.period)
  if (seconds === 0) throw new Error(`Invalid period: ${input.period}`)

  const timeDifference = Date.now() / 1000 - firstDayOfTheWeek.getTime() / 1000
  // TODO : If size is 0, should we return the last month candle/weekly candle?
  const size = Math.floor(timeDifference / seconds) || 1

  const candles: InputGetCandles[] = input.ticker.map((tickerName) => {
    return {
      period: input.period,
      size,
      ticker: tickerName,
      useAskPrice: false,
    }
  })

  const data = await fetch('https://live.trading212.com/charting/v3/candles', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      candles,
    }),
    method: 'PUT',
  })
    .then((d) => d.json())
    .catch((err) => err)
  return data
}
