import { Injectable } from '@angular/core';
import { TelegramUser } from '../interfaces/telegram-user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Alert } from '../interfaces/alert.interface';
import { AlertData } from '../interfaces/alert-data.interface';
import { AddAlert } from '../interfaces/add-alert.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  authenticateTelegramUser(user: TelegramUser): Observable<any> {
    return this.http.post<any>(`${environment.NOTIFICATIONS_API_BASE_URL}telegram-auth`, { user });
  }

  getTelegramAccount(): Observable<TelegramUser> {
    return this.http.get<TelegramUser>(`${environment.NOTIFICATIONS_API_BASE_URL}telegram-auth`);
  }

  createAlert(data: AddAlert): Observable<AlertData> {
    return this.http.post<AlertData>(`${environment.NOTIFICATIONS_API_BASE_URL}alerts/new`, { data });
  }

  getUserAlerts(): Observable<AlertData[]> {
    return this.http.get<AlertData[]>(`${environment.NOTIFICATIONS_API_BASE_URL}alerts/user-alerts`);
  }

  activateAlert(id: number): Observable<void> {
    return this.http.put<void>(`${environment.NOTIFICATIONS_API_BASE_URL}alerts/${id}/activate`, {});
  }

  deleteAlert(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.NOTIFICATIONS_API_BASE_URL}alerts/${id}`);
  }
}
