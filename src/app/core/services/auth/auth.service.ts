import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(
    sessionStorage.getItem('access_token')
  );
  private usuarioLogadoSubject = new BehaviorSubject<User | null>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private api: ApiService, private router: Router) { }

  login(email: string, password: string) {
    return this.api.post('auth/signin', { email, password }).subscribe((response: any) => {
      this.setToken(response.token)
    });
  }

  singup(name:string, email: string, password: string) {
    return this.api.post('auth/signup', {name, email, password }).subscribe((response: any) => {
      this.setToken(response.token);
    });
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  getTokenSnapshot(): string | null {
    return this.tokenSubject.value;
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  clearToken() {
    sessionStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }
}
