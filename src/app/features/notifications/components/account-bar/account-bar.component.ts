import { Component, input } from '@angular/core';
import { TelegramUser } from '../../interfaces/telegram-user.interface';

@Component({
  selector: 'app-account-bar',
  standalone: true,
  imports: [],
  templateUrl: './account-bar.component.html',
  styleUrl: './account-bar.component.css'
})
export class AccountBarComponent {

  telegramAccount = input<TelegramUser>();
  
}
