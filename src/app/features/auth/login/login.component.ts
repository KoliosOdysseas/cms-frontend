import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authApi
      .login({ userName: this.userName.trim(), password: this.password })
      .subscribe({
        next: (res) => {
          // ✅ FIX: το API γυρνάει object { token: "..." }
          this.auth.setToken(res.token);
          this.router.navigateByUrl('/courses');
        },
        error: (err) => {
          this.error = err?.status === 401 ? 'Λάθος στοιχεία.' : 'Κάτι πήγε στραβά.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
