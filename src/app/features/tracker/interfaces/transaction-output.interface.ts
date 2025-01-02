import { Transaction } from "./transaction.interface";

export interface TransactionOutput {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}