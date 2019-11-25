import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {AddWordComponent} from './modal/add-word/add-word.component';
import {MatCardModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppRoutingModule} from '../app-routing.module';
import {BtnBackComponent} from './btn-back/btn-back.component';
import {ConfirmationComponent} from './modal/confirmation/confirmation.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AddWordComponent,
    BtnBackComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MatCardModule,
    MatTooltipModule,
    AppRoutingModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    HttpClientModule,
    HeaderComponent,
    AddWordComponent,
    MatCardModule,
    MatTooltipModule,
    BtnBackComponent
  ],
  entryComponents: [
    AddWordComponent,
    ConfirmationComponent
  ]
})
export class SharedModule {
}
