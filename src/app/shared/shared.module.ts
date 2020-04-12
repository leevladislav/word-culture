import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {BtnBackComponent} from './btn-back/btn-back.component';
import {ValidatorMessageComponent} from './validator-message/validator-message.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BtnBackComponent,
    ValidatorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    HttpClientModule,
    HeaderComponent,
    BtnBackComponent,
    ValidatorMessageComponent
  ]
})
export class SharedModule {
}
