import getCandles from './candles'
import getCompanies from './companies'
import getCurrentCandle from './current_candle'
import { SvgOptions, Ticker, TIME_PERIOD } from './types'
import getCurrentWeeklyCandles from './current_weekly_candles'
import BuildSvg from './to_svg/svgclass'

class Trading212 {
  tickers: string[]
  methodName: any | null
  data: any
  size: number
  period: TIME_PERIOD
  options: any

  constructor() {
    this.tickers = []
    this.data = null
    this.methodName = null
    this.options = null
    this.size = 65
    this.period = 'ONE_DAY'
    this.options = undefined
  }

  from(tickers: Ticker) {
    const uniqueTickers = Array.from(new Set(tickers))
    this.tickers = [uniqueTickers].flat()
    return this
  }
  timeframe(_period: TIME_PERIOD) {
    this.period = _period
    return this
  }
  limit(size: number) {
    if (typeof size !== 'number') {
      console.error('Invalid limit! Field must be number (default 65).')
      return this
    }
    this.size = size
    return this
  }
  companies() {
    this.methodName = getCompanies
    this.options = undefined
    return this
  }
  candles() {
    this.methodName = getCandles
    const { size, period } = this
    this.options = this.tickers.map((ticker) => ({
      period,
      size,
      ticker,
      useAskPrice: false,
    }))
    return this
  }
  currentCandle(showPreviousPrice = false) {
    this.methodName = getCurrentCandle
    const { period } = this
    this.options = this.tickers.map((ticker) => ({
      period,
      ticker,
      showPreviousPrice,
    }))
    return this
  }
  currentWeekCandles() {
    this.methodName = getCurrentWeeklyCandles
    const { period, tickers } = this
    this.options = {
      period,
      ticker: tickers,
    }
    return this
  }
  async select() {
    // TODO : add Error message
    if (!this.methodName) return null
    return await this.methodName(this.options)
  }
  async svg() {
    // TODO : add Error message
    if (!this.methodName) return null
    const data = await this.methodName(this.options)
    const result: any = []
    data?.forEach((element: any) => {
      try {
        const _svgOptions: SvgOptions = {
          title: element?.request.ticker,
          labelPnl: true,
          maxMin: false,
        }
        const svgInstance = new BuildSvg(element?.response?.candles, _svgOptions)
        // const svgString: string = toSvg(element?.response?.candles, _svgOptions)

        result.push(svgInstance.SVG.join(''))
      } catch (err) {
        console.error(err)
      }
    })
    return result.join('')
  }
}

export default Trading212
