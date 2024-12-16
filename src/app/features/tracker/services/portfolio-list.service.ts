import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioListService {
  constructor(private http: HttpClient) {}

  fetchExchangeRate(asset: string): Observable<number> {
    return this.http
      .get<{ rate: number }>(
        `${environment.COINAPI_URL}/exchangerate/${asset}/USDT?apikey=${environment.COINAPI_KEY}`,
      )
      .pipe(map((response) => (response.rate)));
  }
}
