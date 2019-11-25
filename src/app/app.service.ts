import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public currentKey = 0;
  public currentStorage$ = new BehaviorSubject([]);
  public allWords = [];

  constructor() {
  }

  getWordFromLocal() {
    const savedWords = localStorage.getItem('localWords');

    if (savedWords) {
      this.allWords = JSON.parse(savedWords);
      this.currentKey = this.allWords.length;
      this.currentStorage$.next(this.allWords);
    } else {
      this.allWords = [];
    }
  }

  saveWordToLocal(data) {
    if (data) {
      this.getWordFromLocal();

      data.id = this.currentKey;
      this.allWords.push(data);
      this.currentStorage$.next(this.allWords);

      this.currentKey++;

      localStorage.setItem('localWords', JSON.stringify(this.allWords));
    }

    return;
  }

  removeWordFromLocal(wordId) {
    this.getWordFromLocal();

    const currentWord = this.allWords.find(word => word.id === wordId);
    const currentWordIndex = this.allWords.indexOf(currentWord);
    this.allWords.splice(currentWordIndex, 1);

    localStorage.setItem('localWords', JSON.stringify(this.allWords));
  }
}
