import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthorized = input();
  
  constructor (private router: Router) {}
  
  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('auth/login');
  }
}
