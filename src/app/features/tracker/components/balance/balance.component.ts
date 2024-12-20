import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio.service';
import { BalanceResponse } from '../../interfaces/balance-response.interface';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [DecimalPipe, MatButtonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceComponent implements OnInit {
  balance: BalanceResponse | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getBalance().subscribe({
      next: (response: BalanceResponse) => {
        this.balance = response;
      },
      error: (error: Error) => {
        console.error('Failed getting balance', error);
      }
    });
  }
}
