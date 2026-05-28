import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'group-buy-token';
  login(username: string, password: string): boolean {
    if (username.trim() && password.trim()) {
      localStorage.setItem(this.tokenKey, 'mock-token');
      return true;
    }
    return false;
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }


  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
