import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio.service';
import { BalanceResponse } from '../../interfaces/balance-response.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OperationDialogComponent } from '../operation-dialog/operation-dialog.component';
import { NewTransactionDialogComponent } from '../new-transaction-dialog/new-transaction-dialog.component';
import { fadeAnimation } from '../../animations/portfolio.animations';
import { DepositResponse } from '../../interfaces/deposit-response.interface';
import { WithdrawResponse } from '../../interfaces/withdraw-response.interface';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [DecimalPipe, MatButtonModule, MatDialogModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  animations: [fadeAnimation],
})
export class BalanceComponent implements OnInit {
  balance!: BalanceResponse | null;

  constructor(
    private portfolioService: PortfolioService,
    private dialog: MatDialog,
    private updateService: UpdateService,
  ) {}

  ngOnInit(): void {
    //subsctibe to balance updates
    this.updateService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
    this.updateBalance();
  }

  openOperationDialog(action: string): void {
    const dialogRef = this.dialog.open(OperationDialogComponent, {
      data: { action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'deposit') {
          console.log('deposit:', result.amount);
          this.portfolioService.makeDeposit(result.amount).subscribe({
            next: (response: DepositResponse) => {
              if (this.balance) {
                this.balance.deposit = response.deposit;
                this.balance.balance = response.balance;
              }
            },
            error: (error: Error) => {
              console.log('Failed to make deposit:', error);
            },
          });
        } else if (result.action === 'withdraw') {
          console.log('withdraw:', result.amount);
          this.portfolioService.makeWithdraw(result.amount).subscribe({
            next: (response: WithdrawResponse) => {
              if (this.balance) {
                this.balance.withdraw = response.withdraw;
                this.balance.balance = response.balance;
              }
            },
            error: (error: Error) => {
              console.log('Failed to make withdraw:', error);
            },
          });
        }
      }
    });
  }

  openNewTransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      autoFocus: false,
    });
  }

  updateBalance(): void {
    this.portfolioService.getBalance().subscribe({
      next: (response: BalanceResponse) => {
        this.balance = response;
      },
      error: (error: Error) => {
        console.error('Failed getting balance', error);
      },
    });
  }
}
