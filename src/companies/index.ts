import { CompanyTicker } from '../types'

export default async function getCompanies() {
  const data: CompanyTicker[] = await fetch('https://live.trading212.com/rest/companies').then((d) => d.json())
  return data
}
