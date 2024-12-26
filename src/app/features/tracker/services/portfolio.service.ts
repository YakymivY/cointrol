import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BalanceResponse } from '../interfaces/balance-response.interface';
import { environment } from '../../../../environments/environment';
import { TransactionRequest } from '../interfaces/transaction-request.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getBalance(): Observable<BalanceResponse> {
    return this.http.get<BalanceResponse>(`${environment.API_BASE_URL}portfolio/balance`);
  }

  makeDeposit(amount: number): Observable<Object> {
    return this.http.post(`${environment.API_BASE_URL}portfolio/deposit`, { amount });
  }

  makeWithdraw(amount: number): Observable<Object> {
    return this.http.post(`${environment.API_BASE_URL}portfolio/withdraw`, { amount });
  }

  addTransaction(data: TransactionRequest): Observable<Object> {
    return this.http.post(`${environment.API_BASE_URL}transactions/new`, data);
  }

  getListOfStorages(): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}transactions/storages`);
  }

  getUserAssets(): Observable<any> {
    return this.http.get(`${environment.API_BASE_URL}portfolio/assets`);
  }

  fetchExrate(asset: string): Observable<number> {
    const headers = new HttpHeaders().set('X-CoinAPI-Key', environment.COINAPI_KEY);
    return this.http.get<any>(`${environment.COINAPI_URL}/exchangerate/${asset}/USDT`, { headers }).pipe(
      map(data => data.rate)
    );
  }
}
