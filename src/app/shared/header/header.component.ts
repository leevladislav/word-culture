import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from '../../home/home.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../services/theme.service';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {PwaService} from '../services/pwa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  darkMode = false;
  private subscriptions: Subscription[] = [];
  public wordResult: {
    word: any
  };
  showBtnInstallApp = false;

  constructor(
    private homeService: HomeService,
    public themeService: ThemeService,
    private router: Router,
    private pwaService: PwaService
  ) {
  }

  ngOnInit() {
    this.homeService.getRandomWord();
    const subscription = this.homeService.word$.subscribe((res) => {
      if (res) {
        this.wordResult = res;
      }
    });
    this.subscriptions.push(subscription);

    this.displayBtnInstallApp();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  getRandomWord() {
    this.homeService.getRandomWord();
  }

  changeTheme() {
    this.themeService.setDarkTheme(this.darkMode);
  }

  displayBtnInstallApp() {
    const subscriptionCheckInstallApp = this.pwaService.showBtnInstallApp$.subscribe(
      (res) => this.showBtnInstallApp = res
    );
    this.subscriptions.push(subscriptionCheckInstallApp);
  }

  installApp() {
    this.pwaService.installApp();
    this.displayBtnInstallApp();
  }
}
