import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css'],
    standalone: false
})
export class AuthFormComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly route = inject(Router)
  private readonly authService = inject(AuthService);

  typeRote = signal<'login' | 'register'>('login');

  sub = new Subscription();

  authForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

    constructor() {
      effect(() => {
        this.sub.add(
          this.activatedRoute.data.subscribe(data => {
            this.typeRote.set(data['type'] || 'login');
          })
        );
      });
     }

     ngOnInit() {
      this.sub.add(
        this.activatedRoute.queryParams.subscribe((params) => {
        const type = params['type'] || 'login';

        if (type === 'login') {
          (this.authForm as FormGroup).removeControl('name');
        } else {
          this.authForm.addControl('name', new FormControl('', Validators.required));
        }
      })
      );
    }

    verifyAccount() {
      const nextType = this.typeRote() === 'login' ? 'register' : 'login';
      this.typeRote.set(nextType);
      this.authForm.reset();
   }

   get name() {
    return this.authForm.get('name');
   }

   get email() {
    return this.authForm.get('email');
   }

   get password() {
    return this.authForm.get('password');
   }

   onSubmit() {
    if (this.authForm.valid) {
      if(this.typeRote() === 'login') {
        const {email , password} = this.authForm.value;
        this.sub.add(
          this.authService.login(email ?? '', password ?? '').subscribe({
          next: (response: any) => {
            this.authService.setToken(response.token);
            this.route.navigateByUrl('/user');
          },
          error: (error) => {
            console.error('Error during login:', error);
          }
        })
        )
      }
      if(this.typeRote() === 'register') {
        this.sub.add(
          this.authService.singup(
          this.name?.value ?? '',
          this.email?.value ?? '',
          this.password?.value ?? ''
        ).subscribe({
          next: (response: any) => {
            this.authService.setToken(response.token);
            this.route.navigateByUrl('/user');
          },
          error: (error) => {
            console.error('Error during signup:', error);
          }
        })
        )
      }
      this.authForm.reset();
    } else {
      console.log('Form is invalid');
    }
   }

   ngOnDestroy(): void {
       if(this.sub) this.sub.unsubscribe();
   }
}
