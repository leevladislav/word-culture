import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {Subscription} from 'rxjs';
import {PwaService} from './shared/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  darkTheme = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public themeService: ThemeService,
    private pwaService: PwaService
  ) {
  }

  ngOnInit() {
    this.themeService.setDarkTheme(this.darkTheme);
    const subscriptionTheme = this.themeService.darkTheme$.subscribe((res) => {
      this.darkTheme = res;
    });
    this.subscriptions.push(subscriptionTheme);

    this.pwaService.beforeInstallPrompt();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }
}
