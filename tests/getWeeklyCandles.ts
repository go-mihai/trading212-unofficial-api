import 'jest-fetch-mock'

import trading212 from '../src/index'

describe('trading212.getWeeklyCandles', () => {
  it('should return an array of candles for the specified tickers', async () => {
    const data = await trading212.getCurrentWeeklyCandles({
      period: 'ONE_DAY',
      ticker: ['EURUSD', 'USDJPY'],
    })
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(2)
    expect(data[0].response.candles).toBeDefined()
    expect(data[1].response.candles).toBeDefined()
  })

  it('should throw an error if an invalid period is provided', async () => {
    try {
      await trading212.getCurrentWeeklyCandles({
        // @ts-ignore: test-case
        period: 'INVALID_PERIOD',
        ticker: ['EURUSD'],
      })
      fail()
    } catch (error: any) {
      expect(error.message).toBe('Invalid period: INVALID_PERIOD')
    }
  })
})
