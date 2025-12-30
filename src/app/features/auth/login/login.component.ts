import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName = '';
  password = '';
  loading = false;
  error = '';

  private returnUrl = '/courses';

  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // if there's a returnUrl query param, use it; otherwise default to /courses
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/courses';
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authApi
      .login({ userName: this.userName.trim(), password: this.password })
      .subscribe({
        next: (res) => {
          // API returns: { token: "..." }
          this.auth.setToken(res.token);

          // go to returnUrl or default to /courses
          this.router.navigateByUrl(this.returnUrl);
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
