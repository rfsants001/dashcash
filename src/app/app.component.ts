import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  title = 'dashcash';

  constructor(private auth: AuthService) { }

  login(){
    this.auth.login('rafa1@teste.com', '12345678')
  }
  signup(){
    this.auth.singup('Rafael','rafa3@teste.com', '12345678')
  }
}
