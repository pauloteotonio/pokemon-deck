import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './containers/deck-list/deck-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeckListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
