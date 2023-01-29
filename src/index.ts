import getCandles from './candles'
import getCompanies from './companies'
import { InputGetCandles } from './types'

class Trading212 {
  async getCompanies() {
    return await getCompanies()
  }
  async getCandles(input: InputGetCandles[] | InputGetCandles) {
    return await getCandles(input)
  }
}

const trading212 = new Trading212()

export default trading212
