import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinComplex } from '../interfaces/coin-complex.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CoinComplexOutput } from '../interfaces/coin-complex-output.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenlistService {

  constructor(private http: HttpClient) { }

  //get assets data for tokelist page
  getTokenlistData(page: number, limit: number): Observable<CoinComplexOutput> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<CoinComplexOutput>(`${environment.API_BASE_URL}integrations/tokenlist-item-data`, { params });
  }

  //get assets data for provided tokens
  getCertainTokenData(tickers: string): Observable<CoinComplexOutput> {
    const params = new HttpParams().set('tickers', tickers);
    return this.http.get<CoinComplexOutput>(`${environment.API_BASE_URL}integrations/tokenlist-item-data`, { params });
  }
}
