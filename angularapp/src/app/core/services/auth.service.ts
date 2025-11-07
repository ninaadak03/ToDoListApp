import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser?: User;

  login(email: string, password: string) {
    // TODO: implement real login
    this.currentUser = { id: '1', name: 'Demo', email, token: 'demo-token' };
    return Promise.resolve(this.currentUser);
  }

  logout() {
    this.currentUser = undefined;
  }

  getUser(): User | undefined {
    return this.currentUser;
  }
}
