export interface IExchangeAmountResponse {
  estimatedAmount: string;
  transactionSpeedForecast: number;
  warningMessage: string | null
}

export interface IMinAmountResponse {
  minAmount: string;
}