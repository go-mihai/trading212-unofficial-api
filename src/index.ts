import getCandles from './candles'
import getCompanies from './companies'
import getCurrentCandle from './current_candle'
import { CurrentWeeklyCandles, SvgOptions, Ticker, TIME_PERIOD } from './types'
import getCurrentWeeklyCandles from './current_weekly_candles'
import toSvg from './to_svg'

class Trading212 {
  tickers: string[]
  methodName: Function | null
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
    this.tickers = [tickers].flat()
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
  currentCandle(showPreviousPrice : boolean = false) {
    this.methodName = getCurrentCandle;
    const {period} = this;
    this.options = this.tickers.map((ticker) => ({
      period,
      ticker,
      showPreviousPrice
    }))
    return this;
  }
  currentWeekCandles(){
    this.methodName = getCurrentWeeklyCandles;
    const {period} = this;
    this.options = this.tickers.map((ticker) => ({
      period,
      ticker,
    }))
    return this;
  }
  select() {
    // TODO : add Error message
    if (!this.methodName) return null
    return this.methodName(this.options)
  }
  // return a list of svg images
  async svg() {
    // TODO : add Error message
    if (!this.methodName) return null
    this.data = await this.methodName(this.options)
    const result: string[] = []
    this.data.forEach((element: any) => {
      try {
        const _svgOptions: SvgOptions = {
          title: element?.request.ticker,
          labelPnl: true,
          maxMin: false,
        }
        const svgString: string = toSvg(element?.response?.candles, _svgOptions)
        result.push(svgString)
      } catch (err) {
        console.error(err)
      }
    })
    return result
  }
}

const trading212 = new Trading212()

export default trading212
