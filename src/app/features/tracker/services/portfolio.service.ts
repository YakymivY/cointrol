import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BalanceResponse } from '../interfaces/balance-response.interface';
import { environment } from '../../../../environments/environment';
import { TransactionRequest } from '../interfaces/transaction-request.interface';
import { WebsocketService } from './websocket.service';
import { TransactionOutput } from '../interfaces/transaction-output.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private dataSubject = new BehaviorSubject<any>(null);
  portfolioData$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private webSocketService: WebsocketService) { }

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

  //start websocket connection
  listenToPortfolioData(): void {
    this.webSocketService.connect();
    this.webSocketService.emit('subscribe-portfolio-data', {});
    //listen for data from the server
    this.webSocketService.on('portfolio-data', (data) => {
      this.dataSubject.next(data);
    });
  }

  //get user's transactions
  getUserTransactions(page: number, limit: number): Observable<TransactionOutput> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<TransactionOutput>(`${environment.API_BASE_URL}transactions`, { params });
  }
}
