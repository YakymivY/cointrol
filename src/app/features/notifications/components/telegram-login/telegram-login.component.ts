import { Component, OnInit } from '@angular/core';
import { TelegramUser } from '../../interfaces/telegram-user.interface';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-telegram-login',
    imports: [],
    templateUrl: './telegram-login.component.html',
    styleUrl: './telegram-login.component.css'
})
export class TelegramLoginComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.addTelegramLoginWidget();
    //expose the callback function globally
    (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
  }

  addTelegramLoginWidget(): void {
    const widgetContainer = document.getElementById('telegram-login-button');

    if (widgetContainer) {
      widgetContainer.innerHTML = '';

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'CointrolNotificationBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)')
      script.setAttribute('data-request-access', 'write');

      widgetContainer.appendChild(script);
    }
  }

  onTelegramAuth(user: TelegramUser) {
    this.notificationsService.authenticateTelegramUser(user).subscribe({
      next: (response) => {
        this.notificationsService.setTelegramUser(response.data);
      },
      error: (error: Error) => {
        console.error('Failed to authenticate telegram user:', error);
      }
    });
  }
}
