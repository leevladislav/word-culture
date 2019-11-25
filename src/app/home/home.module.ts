import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {TranslatorComponent} from './translator/translator.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    TranslatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
