import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {wordPattern} from '../../app.constans';
import {TranslatorService} from './translator.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit, OnDestroy {
  translateForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public wordResult: {
    image: any,
    pronunciation: any,
    word: any,
    type: any,
    definition: any,
    example: any
  };
  errorMessages: '';

  constructor(
    private fb: FormBuilder,
    private translatorService: TranslatorService
  ) {
  }

  ngOnInit() {
    this.translateForm = this.fb.group({
      word: ['', [Validators.pattern(wordPattern)]]
    });

    const subscription = this.translatorService.word$.subscribe((res) => {
      if (res) {
        this.wordResult = res;
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  searchWord(event) {
    event.preventDefault();

    this.errorMessages = '';

    const data = this.translateForm.value;
    const subscriptionSearch = this.translatorService.translate(data.word).subscribe(
      (res) => {
        if (res) {
          this.wordResult = res;
        }
      },
      (err) => {
        if (err.status === 404) {
          this.errorMessages = err.error['0'].message;
          console.log('this.errorMessages', this.errorMessages);
        }

      }
    );

    this.subscriptions.push(subscriptionSearch);
  }
}
