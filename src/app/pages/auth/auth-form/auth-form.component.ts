import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  type: 'login' | 'register' = 'login';

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.type = data['type'] || 'login';
      })
    }

    verifyAccount() {
      if (this.type === 'login') {
        console.log('Verifying account for login...');
      } else {
        console.log('Verifying account for registration...');
      }
    }
}
