import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportModePageRoutingModule } from './sport-mode-routing.module';

import { SportModePage } from './sport-mode.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    SportModePageRoutingModule,
  ],
  declarations: [SportModePage]
})
export class SportModePageModule {}
