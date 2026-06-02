import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthTs } from '../services/auth.ts';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthTs);
  const router = inject(Router);

  const existingUser = authService.currentUser();

  if (existingUser) {
    return true;
  }
   return authService.getCurrentUser().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
