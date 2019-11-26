import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public currentWordKey = 0;
  public currentStorage$ = new BehaviorSubject([]);
  public allWords = [];
  public allWordKeys = [];
  public maxWordKey;

  constructor(private router: Router) {
  }

  getWordFromLocal() {
    const savedWords = localStorage.getItem('localWords');

    if (savedWords) {
      this.allWords = JSON.parse(savedWords);
      this.currentStorage$.next(this.allWords);
    } else {
      this.allWords = [];
    }
  }

  setCurrentWordKey() {
    if (this.allWords.length) {
      this.allWordKeys = [];

      this.allWords.forEach((item) => {
        this.allWordKeys.push(item.id);
      });

      this.maxWordKey = Math.max.apply(null, this.allWordKeys);
      this.currentWordKey = this.maxWordKey;
    } else {
      this.currentWordKey = 0;
    }
  }

  checkCurrentWordKey() {
    if (this.currentWordKey === this.maxWordKey) {
      this.currentWordKey++;
    } else {
      this.currentWordKey = this.allWords.length;
    }
  }

  saveWordToLocal(data) {
    if (data) {
      this.getWordFromLocal();
      this.setCurrentWordKey();
      this.checkCurrentWordKey();

      data.id = this.currentWordKey;

      this.allWords.push(data);
      this.currentStorage$.next(this.allWords);

      localStorage.setItem('localWords', JSON.stringify(this.allWords));
    }

    return;
  }

  removeWordFromLocal(wordId) {
    this.getWordFromLocal();

    const currentWord = this.allWords.find(word => word.id === wordId);
    const currentWordIndex = this.allWords.indexOf(currentWord);
    this.allWords.splice(currentWordIndex, 1);

    this.currentStorage$.next(this.allWords);
    localStorage.setItem('localWords', JSON.stringify(this.allWords));

    if (!this.allWords.length) {
      this.router.navigate(['home']).then(() => false);
    }
  }
}
