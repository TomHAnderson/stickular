import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      // Google Analytics
      if (event instanceof NavigationEnd) {
        ga('set', 'page', router.url);
        ga('send', 'pageview');
      }
    });
  }
}
