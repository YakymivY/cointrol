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
import { Router, RouterModule } from '@angular/router';
import { ConfirmPassword } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/register-request.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: ConfirmPassword('password', 'confirmPassword') },
    );
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isSubmitting = true; //loading flag
      const formData: RegisterRequest = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.errorMessage = null;
          this.router.navigateByUrl('/auth/login');
        },
        error: (error: Error) => {
          console.error('Registration failed', error);
          this.errorMessage = error.message;
          this.isSubmitting = false;
        },
      });
    }
  }
}
