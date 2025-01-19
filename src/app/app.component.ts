import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  authorized!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const excludedRoutes = ['/auth/login', '/auth/register'];
      this.showHeader = !excludedRoutes.includes(this.router.url);
      //recheck authorization on redirect
      this.checkTokenExpiration();
    });
  }

  ngOnInit(): void {
    this.checkTokenExpiration();
  }

  checkTokenExpiration(): void {
    //take token from local storage
    const token = localStorage.getItem('jwt');
    //check if token is expired
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        this.authorized = false;
        this.logoutUser();
      } else {
        this.authorized = true;
      }
    } else {
      this.authorized = false;
    }
  }

  logoutUser(): void {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('auth/login');
  }
}
