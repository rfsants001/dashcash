import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'splash', pathMatch: 'full'
  },
  {
    path: 'splash', component: SplashComponent
  },
  {
    path: 'auth', component: AuthComponent, data: { type: 'login' }
  },
  {
    path: 'auth', component: AuthComponent, data: { type: 'register' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
