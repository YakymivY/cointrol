import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { BalanceComponent } from "./components/balance/balance.component";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [PortfolioListComponent, BalanceComponent],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {}
