import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  darkTheme = false;
  private subscriptions: Subscription[] = [];

  constructor(public themeService: ThemeService) {

  }

  ngOnInit() {
    const subscription = this.themeService.darkTheme$.subscribe((res) => {
      this.darkTheme = res;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }
}
