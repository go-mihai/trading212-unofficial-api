import getCandles from './candles'
import getCompanies from './companies'
import getCurrentCandle from './current_candle'
import { CurrentCandle, CurrentWeeklyCandles, InputGetCandles, Ticker, TIME_PERIOD } from './types'
import getCurrentWeeklyCandles from './current_weekly_candles'
import toSvg from './to_svg'

class Trading212 {
  tickers: string[]
  methodName : Function | null
  data : any
  options : any
  size: number
  period : TIME_PERIOD

  constructor(){
    this.tickers = [];
    this.data = null;
    this.methodName = null;
    this.options = null;
    this.size = 65;
    this.period = 'ONE_DAY';
  }

  from(tickers: Ticker){
    this.tickers = [tickers].flat();
    return this;
  }
  timeframe(_period : TIME_PERIOD){
    this.period = _period;
    return this;
  }
  limit(size :number){
    if(typeof size !== "number"){
      console.error('Invalid limit! Field must be number (default 65).')
      return this;
    }
    this.size = size;
    return size;
  }
  companies(){ 
    this.methodName = getCompanies;
    return this;
  }
  candles(){
    this.methodName = getCandles
    return this;
  }
  select(){
    const {size,period} = this;
    if(!this.methodName) return null;
    const options  = this.tickers.map((ticker)  => ({
      period,
      size,
      ticker,
      useAskPrice : false,
    }));
    return this.methodName(options)
  }
  svg(){
    return toSvg();
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
