export interface TransactionRequest {
  asset: string;
  amount: number;
  price: number;
  storage?: string;
}