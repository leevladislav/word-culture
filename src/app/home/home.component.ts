import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
    private translatorService: HomeService
  ) {
  }

  ngOnInit() {
    this.translateForm = this.fb.group({
      word: ['', [Validators.required]]
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
        }
      }
    );

    this.subscriptions.push(subscriptionSearch);
  }
}
