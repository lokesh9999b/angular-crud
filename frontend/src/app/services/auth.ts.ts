import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthTs {
  private apiUrl = 'http://localhost:3000/auth';

  currentUser = signal<AuthUser | null>(null);
  isLoading= signal<boolean>(false);
  
  constructor(private http: HttpClient) {}

  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  getCurrentUser(): Observable<AuthUser> {
    this.isLoading.set(true);

    return this.http.get<AuthUser>(`${this.apiUrl}/me`, {
      withCredentials: true,
    }).pipe(
      tap({
        next: (user) => {
          this.currentUser.set(user);
          this.isLoading.set(false);
        },
        error: () => {
          this.currentUser.set(null);
          this.isLoading.set(false);
        }
      })
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true,
    }).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.isLoading.set(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
