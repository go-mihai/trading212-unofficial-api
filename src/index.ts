import getCandles from './candles'
import getCompanies from './companies'
import getCurrentPrices from './current_prices'
import { CurrentPrices, InputGetCandles } from './types'

class Trading212 {
  async getCompanies() {
    return await getCompanies()
  }
  async getCandles(input: InputGetCandles[] | InputGetCandles) {
    return await getCandles(input)
  }
  async getCurrentPrices(input: CurrentPrices[] | CurrentPrices) {
    return await getCurrentPrices(input)
  }
}

const trading212 = new Trading212()

export default trading212
