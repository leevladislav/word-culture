import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyWordsComponent} from './my-words.component';
import {MyWordsGuard} from './my-words.guard';

const routes: Routes = [
  {
    path: '',
    component: MyWordsComponent,
    canActivate: [MyWordsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWordsRoutingModule {
}
