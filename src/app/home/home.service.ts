import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  public word$ = new BehaviorSubject(null);
  public randomWords = [
    'apple',
    'avocadoes',
    'bedclothes',
    'blisters',
    'crupper',
    'chayotes',
    'chinchillas',
    'cupcake',
    'freighter',
    'tempura',
    'monocles',
    'orioles',
    'pitchfork',
    'spathe',
    'tapirs',
    'ladybird',
    'warplanes',
    'whitefish',
  ];

  constructor(private http: HttpClient) {
  }

  setExternalTranslate(word) {
    this.word$.next(word);
  }

  getRandomWord() {
    const randomNumber = Math.floor(Math.random() * this.randomWords.length);
    const randomWord = this.randomWords[randomNumber];

    this.translate(randomWord).subscribe(
      (res) => {
        if (res) {
          this.setExternalTranslate(res);
        }
      },
      (err) => {
        console.log('asdasd', err);
      }
    );
  }

  translate(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token a67d8828e6b4584cd571867c6f7e9159bf31aa7f'
      })
    };
    const apiUrl = 'https://owlbot.info/api/v3/dictionary/';

    return this.http.get(apiUrl + data, httpOptions)
      .pipe(map((res: any) => ({
        word: res.word,
        image: res.definitions['0'].image_url,
        type: res.definitions['0'].type,
        pronunciation: res.pronunciation,
        definition: res.definitions['0'].definition,
        example: res.definitions['0'].example
      })));
  }
}
