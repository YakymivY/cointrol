import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioListService {

  constructor(private http: HttpClient) {}

  async fetchExchangeRates(): Promise<void> {
    const assets: string[] = ['BTC', 'ETH'];
    const requests = assets.map((asset) => {
      return this.http.get(`${environment.COINAPI_URL}/exchangerate/${asset}/USDT?apikey=${environment.COINAPI_KEY}`);
    });
    console.log(requests);

    forkJoin(requests).subscribe({
      next: (responses) => {
        const rates = responses.map((response, index) => ({
          asset: assets[index],
          rate: response
        }));
        console.log('Exchange rates: ', rates);
      },
      error: (error) => {
        console.error('Error fetching exchange rates: ', error);
      }
    });
  }


}
