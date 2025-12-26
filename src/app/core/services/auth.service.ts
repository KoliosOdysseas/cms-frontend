import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'cms_token';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
