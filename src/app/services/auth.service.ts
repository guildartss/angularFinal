import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'auth_user';

  constructor(private router: Router) {}

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '123') {
      localStorage.setItem(this.KEY, JSON.stringify({ user }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) !== null;
  }
}