import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScorePagePageRoutingModule } from './score-page-routing.module';

import { ScorePagePage } from './score-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScorePagePageRoutingModule
  ],
  declarations: [ScorePagePage]
})
export class ScorePagePageModule {}
