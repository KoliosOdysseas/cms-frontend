import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService, UserRole } from '../../../core/services/auth-api.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userName = '';
  password = '';
  role: UserRole = 'Student';

  loading = false;
  error = '';
  success = '';

  constructor(private api: AuthApiService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.api.register({
      userName: this.userName.trim(),
      password: this.password,
      role: this.role,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Account created! You can login now.';
        // μικρό delay για να το δει, ή κατευθείαν:
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.loading = false;

        // 409 από backend = username exists (εσύ είχες κάνει 409 handling)
        if (err?.status === 409) {
          this.error = 'Username already exists.';
          return;
        }

        this.error = 'Register failed. Please try again.';
      }
    });
  }
}
