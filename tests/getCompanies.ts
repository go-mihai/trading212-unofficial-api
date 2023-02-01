import 'jest-fetch-mock'

import trading212 from '../src/index'

describe('trading212.getCompanies', () => {
  it('should return a list of companies', async () => {
    const companies = await trading212.getCompanies()
    expect(Array.isArray(companies)).toBe(true)
    expect(companies.length).toBeGreaterThan(0)
  })
})
