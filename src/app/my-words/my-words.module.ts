import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyWordsRoutingModule} from './my-words-routing.module';
import {MyWordsComponent} from './my-words.component';
import {MyWordCardComponent} from './my-word-card/my-word-card.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    MyWordsComponent,
    MyWordCardComponent
  ],
  imports: [
    CommonModule,
    MyWordsRoutingModule,
    SharedModule
  ]
})

export class MyWordsModule {
}
