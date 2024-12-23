import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio.service';
import { BalanceResponse } from '../../interfaces/balance-response.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OperationDialogComponent } from '../operation-dialog/operation-dialog.component';
import { NewTransactionDialogComponent } from '../new-transaction-dialog/new-transaction-dialog.component';
import { fadeAnimation } from '../../animations/portfolio.animations';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [DecimalPipe, MatButtonModule, MatDialogModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  animations: [fadeAnimation],
})
export class BalanceComponent implements OnInit {
  balance: BalanceResponse | null = null;

  constructor(private portfolioService: PortfolioService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateBalance();
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, { autoFocus: false });
  }

  openOperationDialog(action: string): void {
    const dialogRef = this.dialog.open(OperationDialogComponent, { data: { action }, autoFocus: false});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'deposit') {
          console.log('deposit:', result.amount);
          this.portfolioService.makeDeposit(result.amount).subscribe({
            next: (response) => {
              console.log('Deposit successful', response);
              //update the balance on ui
              this.updateBalance();
            },
            error: (error: Error) => {
              console.log('Failed to make deposit:', error);
            }
          });
        } else if (result.action === 'withdraw') {
          console.log('withdraw:', result.amount);
          this.portfolioService.makeWithdraw(result.amount).subscribe({
            next: (response) => {
              console.log('Withdraw successful', response);
              //update the balance on ui
              this.updateBalance();
            },
            error: (error: Error) => {
              console.log('Failed to make withdraw:', error);
            }
          });
        }
      }
    });
  }

  openNewTransactionDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, { autoFocus: false });
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
