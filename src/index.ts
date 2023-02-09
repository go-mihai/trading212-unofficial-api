import getCandles from './candles'
import getCompanies from './companies'
import getCurrentCandle from './current_candle'
import { CurrentCandle, CurrentWeeklyCandles, InputGetCandles, Ticker } from './types'
import getCurrentWeeklyCandles from './current_weekly_candles'
import toSvg from './to_svg'

class Trading212 {
  tickers: string[]
  constructor(){
    this.tickers = [];
  }
  select(tickers: Ticker){
    this.tickers = [tickers].flat();
    return this;
  }
  companies(){
    return getCompanies();
  }
  async getCompanies() {
    return await getCompanies()
  }
  async getCandles(input: InputGetCandles[] | InputGetCandles) {
    return await getCandles(input)
  }
  async getCurrentCandle(input: CurrentCandle[] | CurrentCandle) {
    return await getCurrentCandle(input)
  }
  async getCurrentWeeklyCandles(input: CurrentWeeklyCandles) {
    return await getCurrentWeeklyCandles(input)
  }
  async toSvg() {
    return await toSvg()
  }
}

const trading212 = new Trading212()

export default trading212
