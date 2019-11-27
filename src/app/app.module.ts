import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {MyWordsGuard} from './my-words/my-words.guard';
import {AuthGuard} from './auth/auth.guard';
import {AppGuard} from './app.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    AppGuard,
    MyWordsGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
