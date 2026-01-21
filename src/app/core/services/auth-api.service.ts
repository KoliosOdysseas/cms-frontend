import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define user roles
export type UserRole = 'Admin' | 'Teacher' | 'Student';

export interface RegisterRequest {
  userName: string;
  password: string;
  email: string;
  RoleName: string;
}

// Interface for login request
export interface LoginRequest {
  userName: string;
  password: string;
}

// Interface for authentication response
export interface AuthResponse {
  token: string; 
}
// Service for handling authentication API calls
@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly baseUrl = 'https://localhost:7286/api/Auth';

  constructor(private http: HttpClient) {}

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, req);
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req);
  }
}
