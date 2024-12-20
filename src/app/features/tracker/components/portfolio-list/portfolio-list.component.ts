import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebsocketService } from '../../services/websocket.service';
import { fadeAnimation } from '../../animations/portfolio.animations';
import { PricePipe } from '../../pipes/price.pipe';
import { PortfolioData } from '../../interfaces/portfolio-data.interface';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [MatTableModule, PricePipe, MatProgressSpinnerModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
  animations: [fadeAnimation],
})
export class PortfolioListComponent implements OnInit {
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
  portfolioData: PortfolioData | null = null;
  dataSource: MatTableDataSource<any> | null = null; 

  constructor(
    private webSocketService: WebsocketService,
  ) {}

  ngOnInit(): void {
    this.webSocketService.connect();
    this.webSocketService.emit('subscribe-portfolio-data', {});
    //listen for data from the server
    this.webSocketService.on('portfolio-data', (data) => {
      console.log('Portfolio data received:', data);
      this.portfolioData = data;
      this.dataSource = new MatTableDataSource(data.assets);
    });
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
