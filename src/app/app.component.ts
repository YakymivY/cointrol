import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const excludedRoutes = ['/auth/login', '/auth/register'];
      this.showHeader = !excludedRoutes.includes(this.router.url);
    });
  }
}
