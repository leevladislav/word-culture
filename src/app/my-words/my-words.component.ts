import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {
  words: any;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
    this.appService.getWordFromLocal();

    this.appService.currentStorage$.subscribe((res) => {
      this.words = res;
    });
  }
}
