import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.css'],
    animations: [
         trigger('slideInAndOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-20px)' }),
      animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      animate('2800ms', style({ opacity: 1, transform: 'translateX(0)' })),
      animate('600ms ease-in', style({ opacity: 0, transform: 'translateX(-10px)' }))
    ])
  ])
    ],
    standalone: false
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth'], { queryParams: { type: 'login' } });
    }
    , 4000);
  }

}
