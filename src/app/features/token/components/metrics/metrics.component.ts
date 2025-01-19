import { Component, input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NumberAbbreviationPipe } from '../../../../shared/pipes/number-abbreviation.pipe';
import { PricePipe } from '../../../tracker/pipes/price.pipe';
import { CoinMetrics } from '../../interfaces/coin-metrics.interface';

@Component({
    selector: 'app-metrics',
    imports: [DecimalPipe, DatePipe, NumberAbbreviationPipe, PricePipe],
    templateUrl: './metrics.component.html',
    styleUrl: './metrics.component.css'
})
export class MetricsComponent implements OnInit {

  Math = Math;
  ticker = input<string>();
  metrics!: CoinMetrics;
//   metrics: any = {
//     "id": "ethereum",
//     "symbol": "eth",
//     "name": "Ethereum",
//     "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
//     "current_price": 3633.77,
//     "market_cap": 437786933184,
//     "market_cap_rank": 2,
//     "fully_diluted_valuation": 437786933184,
//     "total_volume": 21045189332,
//     "high_24h": 3737.69,
//     "low_24h": 3622.05,
//     "price_change_24h": -20.59558755596663,
//     "price_change_percentage_24h": -0.56359,
//     "market_cap_change_24h": -2433681719.0149536,
//     "market_cap_change_percentage_24h": -0.55283,
//     "circulating_supply": 120471953.4872932,
//     "total_supply": 120471953.4872932,
//     "max_supply": null,
//     "ath": 4878.26,
//     "ath_change_percentage": -25.57238,
//     "ath_date": "2021-11-10T14:24:19.604Z",
//     "atl": 0.432979,
//     "atl_change_percentage": 838456.64203,
//     "atl_date": "2015-10-20T00:00:00.000Z",
//     "roi": {
//         "times": 47.17473311225957,
//         "currency": "btc",
//         "percentage": 4717.473311225956
//     },
//     "last_updated": "2025-01-07T12:45:02.617Z"
// };

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.getTokenMetrics(this.ticker() || '').subscribe({
      next: (response: CoinMetrics) => {
        this.metrics = response;
      },
      error: (error: Error) => {
        console.error('Failed to fetch metrics:', error);
      }
    })
  }
}
