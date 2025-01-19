import { LoginResponse } from './../../interfaces/login-response.interface';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isSubmitting = true; //loading flag
      const formData: LoginRequest = this.loginForm.value;

      this.authService.login(formData).subscribe({
        next: (response: LoginResponse) => {
          this.saveToken(response.token);
          this.isSubmitting = false;
          this.errorMessage = null;
          this.router.navigateByUrl('/');
        },
        error: (error: Error) => {
          console.error('Login failed', error);
          this.errorMessage = error.message;
          this.isSubmitting = false;
        }
      });
    }
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }
}
