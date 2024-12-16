export interface ExchangeRateResponse {
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
  time: string;
}

export interface ExchangeRate {
  asset: string,
  rate: number
}