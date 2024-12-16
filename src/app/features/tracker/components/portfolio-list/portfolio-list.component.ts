import { Component, OnInit } from '@angular/core';
import { PortfolioListService } from '../../services/portfolio-list.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExchangeRate } from '../../interfaces/exchange_rate.interface';
import { DecimalPipe } from '@angular/common';
import { PortfolioAsset } from '../../interfaces/portfolio-asset.interface';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
})
export class PortfolioListComponent implements OnInit {
  rates: ExchangeRate[] = [];
  assets: PortfolioAsset[] = [
    {
      asset: 'BTC',
      amount: 0.5,
    },
    {
      asset: 'ETH',
      amount: 2,
    },
    {
      asset: 'SOL',
      amount: 3
    }
  ];

  constructor(private portfolioListService: PortfolioListService) {}

  ngOnInit(): void {
    const requests = this.assets.map((assetObj) => 
      this.portfolioListService.fetchExchangeRate(assetObj.asset).pipe(
        map((rate: number) => ({
          ...assetObj,
          rate,
        })),
      )
    );

    forkJoin(requests).subscribe({
      next: (assetsWithRates) => {
        this.assets = assetsWithRates;
      },
      error: (error) => {
        console.error('Error fetching exchange rates: ', error);
      },
    });
  }
}
