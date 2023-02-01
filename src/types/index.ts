export interface CompanyTicker {
  ticker: string
  isin: string
}

export type TIME_PERIOD =
  | 'ONE_MINUTE'
  | 'FIVE_MINUTES'
  | 'TEN_MINUTES'
  | 'FIFTEEN_MINUTES'
  | 'THIRTY_MINUTES'
  | 'ONE_HOUR'
  | 'FOUR_HOURS'
  | 'ONE_DAY'
  | 'ONE_WEEK'
  | 'ONE_MONTH'

export interface InputGetCandles {
  period: TIME_PERIOD
  size: number
  ticker: string
  useAskPrice: boolean
}

export interface CurrentCandle {
  period: TIME_PERIOD
  ticker: string
  showPreviousPrice?: boolean
}

export interface CurrentWeeklyCandles {
  period: TIME_PERIOD
  ticker: string[]
}
