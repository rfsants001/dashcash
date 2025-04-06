import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { DollarSign, LucideAngularModule } from 'lucide-angular';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthFormComponent } from './pages/auth/auth-form/auth-form.component';
import { SplashComponent } from './pages/splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthFormComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LucideAngularModule.pick({DollarSign}),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
