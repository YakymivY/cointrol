import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { BalanceResponse } from '../interfaces/balance-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private balanceSubject = new BehaviorSubject<BalanceResponse | null>(null);

  constructor() { }

  get transactions$(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  get balance$(): Observable<BalanceResponse | null> {
    return this.balanceSubject.asObservable();
  }

  addTransaction(transactions: Transaction[]): void {
    const currentTransacitons = this.transactionsSubject.getValue();
    this.transactionsSubject.next([...transactions, ...currentTransacitons]);
  }

  updateBalance(balance: BalanceResponse): void {
    this.balanceSubject.next(balance);
  }
}
