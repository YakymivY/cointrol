import { TransactionType } from "../enums/transaction-type.enum";
import { Storage } from "./storage.interface";

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: string;
  asset: string;
  price: number;
  amount: number;
  total: number;
  storage?: Storage;
}