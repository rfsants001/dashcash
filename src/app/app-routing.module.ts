import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SplashComponent } from './pages/splash/splash.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

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
  },
  {
    path: 'user', component: HomeComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
