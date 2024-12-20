import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebsocketService } from '../../services/websocket.service';
import { fadeAnimation } from '../../animations/portfolio.animations';
import { PricePipe } from '../../pipes/price.pipe';
import { PortfolioData } from '../../interfaces/portfolio-data.interface';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, PricePipe, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
  animations: [fadeAnimation],
})
export class PortfolioListComponent implements OnInit {
  Math = Math;
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
  showExtraAverage: string = '';
  portfolioData: PortfolioData | null = {
    "userId": "43f69fcb-6c08-4f70-8e54-0027c9ef335f",
    "currentPnl": 186.55728656153198,
    "assets": [
        {
            "asset": "BNB",
            "amount": 1,
            "price": 649.0594029824581,
            "total": 649.0594029824581,
            "average": 451.66,
            "totalSpent": 451.66,
            "pnl": 197.39940298245807,
            "pnlPercent": 43.70530996379092,
            "allTimePnl": 0,
            "totalPnl": 197.39940298245807,
            "historicalData": {
                "1h": {
                    "price": 647.8288718258389,
                    "change": 0.19
                },
                "1d": {
                    "price": 701.2304654360597,
                    "change": -7.44
                },
                "7d": {
                    "price": 717.8408426392709,
                    "change": -9.58
                }
            }
        },
        {
            "asset": "DOT",
            "amount": 4,
            "price": 6.603550174753888,
            "total": 26.414200699015552,
            "average": 3,
            "totalSpent": 12,
            "pnl": 14.414200699015552,
            "pnlPercent": 120.11833915846293,
            "allTimePnl": 0,
            "totalPnl": 14.414200699015552,
            "historicalData": {
                "1h": {
                    "price": 6.506086780223813,
                    "change": 1.5
                },
                "1d": {
                    "price": 7.631927510081074,
                    "change": -13.47
                },
                "7d": {
                    "price": 9.038209511929157,
                    "change": -26.94
                }
            }
        },
        {
            "asset": "ETHFI",
            "amount": 115,
            "price": 1.9249651788947169,
            "total": 221.37099557289244,
            "average": 2.12,
            "totalSpent": 243.8,
            "pnl": -22.42900442710757,
            "pnlPercent": -9.19975571251336,
            "allTimePnl": 0,
            "totalPnl": -22.42900442710757,
            "historicalData": {
                "1h": {
                    "price": 1.902111954910631,
                    "change": 1.2
                },
                "1d": {
                    "price": 2.3011136075555165,
                    "change": -16.35
                },
                "7d": {
                    "price": 2.712397152846825,
                    "change": -29.03
                }
            }
        },
        {
            "asset": "JUP",
            "amount": 15,
            "price": 0.8183433796166932,
            "total": 12.2751506942504,
            "average": 0.9588,
            "totalSpent": 14.382,
            "pnl": -2.1068493057496003,
            "pnlPercent": -14.649209468429984,
            "allTimePnl": 0.03,
            "totalPnl": -2.0768493057496005,
            "historicalData": {
                "1h": {
                    "price": 0.79036129617125,
                    "change": 3.54
                },
                "1d": {
                    "price": 0.9207653800634298,
                    "change": -11.12
                },
                "7d": {
                    "price": 1.123130008162281,
                    "change": -27.14
                }
            }
        },
        {
            "asset": "OP",
            "amount": 3,
            "price": 1.6908455376385032,
            "total": 5.07253661291551,
            "average": 1.931,
            "totalSpent": 5.793,
            "pnl": -0.7204633870844903,
            "pnlPercent": -12.436792457871402,
            "allTimePnl": 2,
            "totalPnl": 1.2795366129155097,
            "historicalData": {
                "1h": {
                    "price": 1.724466431200039,
                    "change": -1.95
                },
                "1d": {
                    "price": 2.2148525509804426,
                    "change": -23.66
                },
                "7d": {
                    "price": 2.599617536283254,
                    "change": -34.96
                }
            }
        }
    ]
};
  dataSource: MatTableDataSource<any> | null = null; 

  constructor(
    private webSocketService: WebsocketService,
  ) {}

  ngOnInit(): void {
    // this.webSocketService.connect();
    // this.webSocketService.emit('subscribe-portfolio-data', {});
    // //listen for data from the server
    // this.webSocketService.on('portfolio-data', (data) => {
    //   this.portfolioData = data;
    //   this.dataSource = new MatTableDataSource(this.portfolioData?.assets);
    // });
    this.dataSource = new MatTableDataSource(this.portfolioData?.assets);
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

  averageOnMouseOver(element: any) {
    this.showExtraAverage = element.asset;
  }
  averageOnMouseLeave(element: any) {
    this.showExtraAverage = '';
  }
  averageOnFocus() {}

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
