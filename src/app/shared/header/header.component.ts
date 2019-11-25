import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslatorService} from '../../home/translator/translator.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddWordComponent} from '../modal/add-word/add-word.component';
import {ThemeService} from '../services/theme.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  checked = false;
  private subscriptions: Subscription[] = [];
  public wordResult: {
    word: any
  };
  modalSubscribe: any;
  public displayWordListBtn = false;

  constructor(
    private translatorService: TranslatorService,
    public dialog: MatDialog,
    public themeService: ThemeService,
    public appService: AppService
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
      (res) => this.displayWordListBtn = !!res.length);
    this.subscriptions.push(subscriptionStorage);
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
        console.log('res', res);
      }
    });
    this.subscriptions.push(this.modalSubscribe);
  }

  changeTheme() {
    this.themeService.setDarkTheme(this.checked);
  }
}
