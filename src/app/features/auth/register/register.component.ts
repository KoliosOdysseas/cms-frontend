import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userName = '';
  password = '';
  email = '';
  roleStudent: UserRole = UserRole.Student;
  roleTeacher: UserRole = UserRole.Teacher;
  roleAdmin: UserRole = UserRole.Admin;
  role: UserRole = this.roleStudent;
  error = '';
  success = '';
  private returnUrl = '/courses';
  constructor(private api: AuthApiService, private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||
'/courses';
  }

  onSubmit(): void {
    if (!this.userName.trim() || !this.password.trim()) {
      this.error = 'Username and password are required.';
      return;
    }

    this.error = '';
    this.success = '';

    this.api.register({
      userName: this.userName.trim(),
      password: this.password.trim(),
      email: this.email.trim(),
      RoleName: this.role,
    }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        if (err?.status === 409) {
          this.error = 'Username already exists.';
          return;
        }

        this.error = 'Register failed. Please try again.';
      }
    });
  }

  selectionRole( role: Event): void {
    this.role = (role.target as HTMLInputElement).value as UserRole;
  }
}

enum UserRole {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student',
}
