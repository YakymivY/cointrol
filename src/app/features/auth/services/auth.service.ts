import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request.interface';
import { LoginRequest } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(environment.API_BASE_URL + 'auth/register', data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('This email is already taken.'));
        }
        return throwError(() => error);
      })
    );
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(environment.API_BASE_URL + 'auth/login', data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Incorrect credentials.'));
        }
        return throwError(() => error);
      })
    );
  }
  
}
