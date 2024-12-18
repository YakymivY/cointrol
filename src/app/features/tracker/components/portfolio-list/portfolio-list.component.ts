import { Component, OnInit } from '@angular/core';
import { PortfolioListService } from '../../services/portfolio-list.service';
import { ExchangeRate } from '../../interfaces/exchange_rate.interface';
import { PortfolioAsset } from '../../interfaces/portfolio-asset.interface';
import { MatTableModule } from '@angular/material/table';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
})
export class PortfolioListComponent implements OnInit {
  assetList: any[] = [
    {
      asset: 'BTC',
      amount: 0.5,
      price: 10,
    },
    {
      asset: 'ETH',
      amount: 2,
      price: 15,
    },
    {
      asset: 'SOL',
      amount: 3,
      price: 40,
    },
  ];
  displayedColumns = ['asset', 'amount'];

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
      amount: 3,
    },
  ];

  constructor(private portfolioListService: PortfolioListService, private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    // const requests = this.assets.map((assetObj) =>
    //   this.portfolioListService.fetchExchangeRate(assetObj.asset).pipe(
    //     map((rate: number) => ({
    //       ...assetObj,
    //       rate,
    //     })),
    //   ),
    // );

    // forkJoin(requests).subscribe({
    //   next: (assetsWithRates) => {
    //     this.assets = assetsWithRates;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching exchange rates: ', error);
    //   },
    // });

    this.webSocketService.connect();

    this.webSocketService.emit('subscribe-portfolio-data', {});

    //listen for data from the server
    this.webSocketService.on('portfolio-data', (data) => {
      console.log('Portfolio data received:', data);
    });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
