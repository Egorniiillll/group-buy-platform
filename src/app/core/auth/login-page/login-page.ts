import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  username = '';
  password = '';
  error = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  login(): void {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/orders']);
    } else {
      this.error = 'Введите логин и пароль';
    }
  }
}
