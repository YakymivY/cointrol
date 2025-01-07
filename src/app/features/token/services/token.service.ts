import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CoinMetrics } from '../interfaces/coin-metrics.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  

  constructor(private http: HttpClient) { }

  getTokenMetrics(ticker: string): Observable<CoinMetrics> {
    const params = new HttpParams().set('ticker', ticker);
    return this.http.get<CoinMetrics>(`${environment.API_BASE_URL}integrations/coin-metrics`, { params });
  } 

  
}
