import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScorePagePage } from './score-page.page';

const routes: Routes = [
  {
    path: '',
    component: ScorePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScorePagePageRoutingModule {}
