// src/app/core/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // allow if logged in
  if (authService.isLoggedIn()) {
    return true;
  }

  // redirect to login + keep return url
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
