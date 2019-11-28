import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageErrorComponent} from './page-error.component';
import {PageErrorRoutingModule} from './page-error-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    PageErrorRoutingModule,
    SharedModule
  ]
})
export class PageErrorModule {
}
