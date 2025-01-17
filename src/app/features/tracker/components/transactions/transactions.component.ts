import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';
import { PortfolioService } from '../../services/portfolio.service';
import { TransactionOutput } from '../../interfaces/transaction-output.interface';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateService } from '../../services/update.service';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DatePipe,
    PricePipe,
    DecimalPipe,
    MatPaginator,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  Math = Math;
  isInitialLoad: boolean = true;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'type',
    'timestamp',
    'asset',
    'price',
    'amount',
    'total',
    'storage',
  ];
  // transactions: Transaction[] = [
  //   {
  //     id: '937f3c67-24aa-41bd-b734-ff95691a0b71',
  //     type: 'buy' as TransactionType,
  //     timestamp: '2024-11-23T10:30:45.000Z',
  //     asset: 'BTC',
  //     price: 40000,
  //     amount: 1,
  //     total: 40000,
  //     storage: 'BINANCE',
  //   },
  //   {
  //     id: '3cd7452f-d3ca-41ee-8cf9-ac37a2c70d05',
  //     type: 'sell' as TransactionType,
  //     timestamp: '2024-11-23T10:30:45.000Z',
  //     asset: 'BTC',
  //     price: 40000,
  //     amount: -2,
  //     total: -80000,
  //     storage: 'MEXC',
  //   },
  //   {
  //     id: '441efe56-e2a4-48a3-a805-12148d50ffad',
  //     type: 'buy' as TransactionType,
  //     timestamp: '2024-11-27T13:32:27.156Z',
  //     asset: 'ETH',
  //     price: 3200.5,
  //     amount: 0.01,
  //     total: 32.005,
  //     storage: '',
  //   },
  // ];

  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private portfolioService: PortfolioService,
    private updateService: UpdateService,
  ) {}

  ngOnInit(): void {
    //subscribe to transactions updates
    this.updateService.transactions$.subscribe((transactions) => {
      console.log(transactions.slice(0, this.pageSize));
      this.dataSource.data = transactions.slice(0, this.pageSize);
      this.totalRecords++;
    });

    this.loadTransactions(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadTransactions(this.currentPage, this.pageSize);
    });
  }

  loadTransactions(page: number, size: number): void {
    this.portfolioService.getUserTransactions(page, size).subscribe({
      next: (response: TransactionOutput) => {
        this.dataSource.data = response.data;
        this.totalRecords = response.total;
        if (this.isInitialLoad) {
          this.updateService.addTransaction(response.data);
          this.isInitialLoad = false;
        }
      },
      error: (error: Error) => {
        console.error('Error fetching user transactions: ', error);
      },
    });
  }
}
