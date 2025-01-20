import { Component, input } from '@angular/core';
import { TelegramUser } from '../../interfaces/telegram-user.interface';
import { NotificationsService } from '../../services/notifications.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-account-bar',
    imports: [],
    templateUrl: './account-bar.component.html',
    styleUrl: './account-bar.component.css'
})
export class AccountBarComponent {

  telegramAccount = input<TelegramUser>();

  constructor(private notificationsService: NotificationsService, private snackBar: MatSnackBar) {}

  telegramLogout() {
    this.notificationsService.deleteTelegramAccount().subscribe({
      next: (response) => {
        this.showSnackBar('snackbar-success', 'Log out successful');
        this.notificationsService.setTelegramUser(null);
      },
      error: (error) => {
        this.showSnackBar('snackbar-error', 'Failed to log out.');
      }
    });
  }

  private showSnackBar(type: string, message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['custom-snackbar', type],
      horizontalPosition: 'right',
    });
  }
  
}
