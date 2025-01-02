import { Component } from '@angular/core';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { BalanceComponent } from './components/balance/balance.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    PortfolioListComponent,
    BalanceComponent,
    SummaryComponent,
    TransactionsComponent,
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {}
