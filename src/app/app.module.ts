import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { BadgeAlert, Banknote, BriefcaseBusiness, ChevronDown, ChevronLeft, ChevronRight, Clapperboard, CreditCard, Funnel, KeyRound, LucideAngularModule, Mail, User, Utensils, Wallet } from 'lucide-angular';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthFormComponent } from './pages/auth/auth-form/auth-form.component';
import { SplashComponent } from './pages/splash/splash.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        AuthComponent,
        AuthFormComponent,
        SplashComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        LucideAngularModule.pick({
            CreditCard,
            User,
            Mail,
            KeyRound,
            Banknote,
            ChevronDown,
            ChevronLeft,
            ChevronRight,
            Funnel,
            Utensils,
            Wallet,
            Clapperboard,
            BriefcaseBusiness,
            BadgeAlert
        }),
        BrowserAnimationsModule], providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
