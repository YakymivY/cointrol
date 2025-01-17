import { BalanceResponse } from "./balance-response.interface";
import { Transaction } from "./transaction.interface";

export interface TransactionResponse {
  transaction: Transaction;
  balance: BalanceResponse;
}