import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type UserRole = 'Admin' | 'Teacher' | 'Student';

export interface RegisterRequest {
  userName: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface AuthResponse {
  token: string; 
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly baseUrl = 'https://localhost:7286/api/Auth';

  constructor(private http: HttpClient) {}

  register(req: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, req);
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req);
  }
}
