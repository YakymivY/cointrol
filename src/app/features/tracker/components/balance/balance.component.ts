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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
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
          this.portfolioService.makeDeposit(result.amount).subscribe({
            next: (response: DepositResponse) => {
              if (this.balance) {
                this.balance.deposit = response.deposit;
                this.balance.balance = response.balance;
              }
              this.showSnackBar('snackbar-success', 'Deposit successful');
            },
            error: (error) => {
              this.showSnackBar('snackbar-error', 'Failed to make deposit');
            },
          });
        } else if (result.action === 'withdraw') {
          this.portfolioService.makeWithdraw(result.amount).subscribe({
            next: (response: WithdrawResponse) => {
              if (this.balance) {
                this.balance.withdraw = response.withdraw;
                this.balance.balance = response.balance;
              }
              this.showSnackBar('snackbar-success', 'Deposit successful');
            },
            error: (error) => {
              this.showSnackBar('snackbar-error', 'Failed to make withdraw');
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
        this.showSnackBar('snackbar-error', 'Error fetching balance');
      },
    });
  }

  private showSnackBar(type: string, message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['custom-snackbar', type], horizontalPosition: 'right'});
  }
}
