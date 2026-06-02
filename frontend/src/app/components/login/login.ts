import { Component } from '@angular/core';
import { AuthTs } from '../../services/auth.ts';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(public authService: AuthTs) {}

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

}
