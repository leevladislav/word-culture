import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslatorService} from '../../home/translator/translator.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddWordComponent} from '../modal/add-word/add-word.component';
import {ThemeService} from '../services/theme.service';
import {AppService} from '../../app.service';
import {LoginService} from '../../auth/login/login.service';
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
  modalSubscribe: any;
  public checkLocalStorage = false;
  public checkUser = false;

  constructor(
    private translatorService: TranslatorService,
    public dialog: MatDialog,
    public themeService: ThemeService,
    public appService: AppService,
    public loginService: LoginService,
    private router: Router,
    private pwaService: PwaService
  ) {

  }

  ngOnInit() {
    this.translatorService.getRandomWord();
    const subscription = this.translatorService.word$.subscribe((res) => {
      if (res) {
        this.wordResult = res;
      }
    });
    this.subscriptions.push(subscription);

    this.appService.getWordFromLocal();
    const subscriptionStorage = this.appService.currentStorage$.subscribe(
      (res) => {
        this.checkLocalStorage = !!res.length;
      });
    this.subscriptions.push(subscriptionStorage);

    this.loginService.checkUser();
    const subscriptionUser = this.loginService.checkUser$.subscribe(
      (res) => {
        this.checkUser = res;
      });
    this.subscriptions.push(subscriptionUser);

    this.pwaService.beforeInstallPrompt();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  getRandomWord() {
    this.translatorService.getRandomWord();
  }

  addWord(event) {
    event.preventDefault();
    if (this.modalSubscribe) {
      this.modalSubscribe.unsubscribe();
    }

    const dialogRef = this.dialog.open(AddWordComponent, {
      data: {
        type: 'Add new word',
        buttonText: 'Add word'
      },
      panelClass: 'main-modal',
      autoFocus: false,
    });

    this.modalSubscribe = dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['my-words']).then(() => false);
      }
    });
    this.subscriptions.push(this.modalSubscribe);
  }

  changeTheme() {
    this.themeService.setDarkTheme(this.darkMode);
  }

  logOut() {
    this.appService.logOut();
  }

  installApp(event) {
    console.log('button click');
    this.pwaService.installApp();
  }
}
