import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  type: 'login' | 'register' = 'login';

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.type = data['type'] || 'login';
      })
    }

    verifyAccount() {
      const nextType = this.type === 'login' ? 'register' : 'login';
      const nextUrl = `/auth?type=${nextType}`;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(nextUrl);
  });
    }
}
