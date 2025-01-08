import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PricePipe } from '../tracker/pipes/price.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NumberAbbreviationPipe } from '../../shared/pipes/number-abbreviation.pipe';
import { CoinComplex } from './interfaces/coin-complex.interface';
import { RouterModule } from '@angular/router';
import { TokenlistService } from './services/tokenlist.service';
import { CoinComplexOutput } from './interfaces/coin-complex-output.interface';

@Component({
  selector: 'app-tokenlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginator,
    PricePipe,
    DecimalPipe,
    NumberAbbreviationPipe,
  ],
  templateUrl: './tokenlist.component.html',
  styleUrl: './tokenlist.component.css',
})
export class TokenlistComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'rank',
    'asset',
    'price',
    'change',
    'mcap',
    'volume',
    'ath',
    'day',
  ];
  displayedCardsTokens: string[] = ['BTC', 'ETH', 'SOL'];

  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  cards: CoinComplex[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tokenlistService: TokenlistService) {}

  ngOnInit(): void {
    this.loadTokenlistData(this.currentPage, this.pageSize);
    this.loadCardsData(this.displayedCardsTokens);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadTokenlistData(this.currentPage, this.pageSize);
    });
  }

  loadCardsData(tickers: string[]): void {
    const tickersString: string = tickers.join(',');
    this.tokenlistService.getCertainTokenData(tickersString).subscribe({
      next: (response: CoinComplexOutput) => {
        this.cards = response.data;
      },
      error: (error: Error) => {
        console.error('Error fetching card tokens data: ', error);
      }
    });
  }

  loadTokenlistData(page: number, size: number): void {
    this.tokenlistService.getTokenlistData(page, size).subscribe({
      next: (response: CoinComplexOutput) => {
        this.dataSource.data = response.data;
        this.totalRecords = response.total;
      },
      error: (error: Error) => {
        console.error('Error fetching tokenlist data: ', error);
      },
    });
  }
}
