import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<string | null>(null);

  login(name: string) {
    this.user.set(name || 'Anonymous');
  }

  logout() {
    this.user.set(null);
  }

  get isLoggedIn() {
    return !!this.user();
  }
}
