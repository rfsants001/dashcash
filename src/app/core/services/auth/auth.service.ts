import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';
  private usuarioLogadoSubject = new BehaviorSubject<User | null>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private api: ApiService, private router: Router) { }

  login(email: string, password: string) {
    return this.api.post('auth/signin', { email, password }).subscribe((response: any) => {
      this.token = response.token;
      localStorage.setItem('token', this.token);
      console.log('Token:', this.token);
    });
  }

  singup(name:string, email: string, password: string) {
    return this.api.post('auth/signup', {name, email, password }).subscribe((response: any) => {
      this.token = response.token;
      localStorage.setItem('token', this.token);
      console.log('Token:', this.token);
    });
  }

}
