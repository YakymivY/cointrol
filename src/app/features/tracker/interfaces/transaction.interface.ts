import { TransactionType } from "../enums/transaction-type.enum";

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: string;
  asset: string;
  price: number;
  amount: number;
  total: number;
  storage?: string;
}