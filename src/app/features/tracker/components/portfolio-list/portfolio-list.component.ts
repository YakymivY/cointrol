import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioListService } from '../../services/portfolio-list.service';
import { ExchangeRate } from '../../interfaces/exchange_rate.interface';
import { PortfolioAsset } from '../../interfaces/portfolio-asset.interface';
import { MatTableModule } from '@angular/material/table';
import { WebsocketService } from '../../services/websocket.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { fadeAnimation } from '../../animations/portfolio.animations';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [DecimalPipe, MatTableModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
  animations: [fadeAnimation],
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
  displayedColumns = [
    'asset',
    'price',
    '1h',
    '24h',
    '7d',
    'amount',
    'avg',
    'pnl',
    'fixedPnl',
    'totalPnl',
  ];

  showExtra1h: string = '';
  showExtra24h: string = '';
  showExtra7d: string = '';
  showExtraAmount: string = '';
  portfolioData: any = {
    userId: '43f69fcb-6c08-4f70-8e54-0027c9ef335f',
    currentPnl: 297.19067846069936,
    assets: [
      {
        asset: 'BNB',
        amount: 1,
        price: 692.4148561073241,
        total: 692.4148561073241,
        average: 451.66,
        totalSpent: 451.66,
        pnl: 240.7548561073241,
        pnlPercent: 53.30444496021877,
        allTimePnl: 0,
        totalPnl: 240.7548561073241,
        historicalData: {
          '1h': {
            price: 709.9532518340465,
            change: -2.47,
          },
          '1d': {
            price: 728.8510013446934,
            change: -5,
          },
          '7d': {
            price: 706.1643561150348,
            change: -1.95,
          },
        },
      },
      {
        asset: 'DOT',
        amount: 4,
        price: 7.760629647169752,
        total: 31.04251858867901,
        average: 3,
        totalSpent: 12,
        pnl: 19.04251858867901,
        pnlPercent: 158.6876549056584,
        allTimePnl: 0,
        totalPnl: 19.04251858867901,
        historicalData: {
          '1h': {
            price: 8.237301486492314,
            change: -5.79,
          },
          '1d': {
            price: 8.68995997643681,
            change: -10.69,
          },
          '7d': {
            price: 9.059821057773611,
            change: -14.34,
          },
        },
      },
      {
        asset: 'ETHFI',
        amount: 115,
        price: 2.440863258191477,
        total: 280.69927469201986,
        average: 2.12,
        totalSpent: 243.8,
        pnl: 36.899274692019844,
        pnlPercent: 15.13505934865457,
        allTimePnl: 0,
        totalPnl: 36.899274692019844,
        historicalData: {
          '1h': {
            price: 2.5727435182094442,
            change: -5.13,
          },
          '1d': {
            price: 2.670848886326487,
            change: -8.61,
          },
          '7d': {
            price: 2.5973786817046793,
            change: -6.03,
          },
        },
      },
      {
        asset: 'JUP',
        amount: 15,
        price: 0.938498200332169,
        total: 14.077473004982535,
        average: 0.9588,
        totalSpent: 14.382,
        pnl: -0.30452699501746494,
        pnlPercent: -2.1174175706957654,
        allTimePnl: 0.03,
        totalPnl: -0.2745269950174649,
        historicalData: {
          '1h': {
            price: 1.0000199690070337,
            change: -6.15,
          },
          '1d': {
            price: 1.0564916344809117,
            change: -11.17,
          },
          '7d': {
            price: 1.1343796384739284,
            change: -17.27,
          },
        },
      },
      {
        asset: 'OP',
        amount: 3,
        price: 2.1971853558979517,
        total: 6.591556067693855,
        average: 1.931,
        totalSpent: 5.793,
        pnl: 0.7985560676938546,
        pnlPercent: 13.784844945517946,
        allTimePnl: 2,
        totalPnl: 2.7985560676938546,
        historicalData: {
          '1h': {
            price: 2.335657461941341,
            change: -5.93,
          },
          '1d': {
            price: 2.3789437677721517,
            change: -7.64,
          },
          '7d': {
            price: 2.3363915499733965,
            change: -5.96,
          },
        },
      },
    ],
  };

  // rates: ExchangeRate[] = [];
  // assets: PortfolioAsset[] = [
  //   {
  //     asset: 'BTC',
  //     amount: 0.5,
  //   },
  //   {
  //     asset: 'ETH',
  //     amount: 2,
  //   },
  //   {
  //     asset: 'SOL',
  //     amount: 3,
  //   },
  // ];

  constructor(
    private portfolioListService: PortfolioListService,
    private webSocketService: WebsocketService,
  ) {}

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
    // this.webSocketService.connect();
    // this.webSocketService.emit('subscribe-portfolio-data', {});
    // //listen for data from the server
    // this.webSocketService.on('portfolio-data', (data) => {
    //   console.log('Portfolio data received:', data);
    // });
  }

  change1hOnMouseOver(element: any) {
    this.showExtra1h = element.asset;
  }
  change1hOnMouseLeave(element: any) {
    this.showExtra1h = '';
  }
  change1hOnFocus() {}

  change24hOnMouseOver(element: any) {
    this.showExtra24h = element.asset;
  }
  change24hOnMouseLeave(element: any) {
    this.showExtra24h = '';
  }
  change24hOnFocus() {}

  change7dOnMouseOver(element: any) {
    this.showExtra7d = element.asset;
  }
  change7dOnMouseLeave(element: any) {
    this.showExtra7d = '';
  }
  change7dOnFocus() {}

  amountOnMouseOver(element: any) {
    this.showExtraAmount = element.asset;
  }
  amountOnMouseLeave(element: any) {
    this.showExtraAmount = '';
  }
  amountOnFocus() {}

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
