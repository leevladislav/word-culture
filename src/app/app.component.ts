import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {Subscription} from 'rxjs';
import {LoginService} from './auth/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  darkTheme = false;
  checkUser = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public themeService: ThemeService,
    public loginService: LoginService
  ) {

  }

  ngOnInit() {
    const subscriptionTheme = this.themeService.darkTheme$.subscribe((res) => {
      this.darkTheme = res;
    });
    this.subscriptions.push(subscriptionTheme);

    const subscriptionUserLogIn = this.loginService.checkUser$.subscribe((res) => {
      this.checkUser = res;
    });
    this.subscriptions.push(subscriptionUserLogIn);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }
}