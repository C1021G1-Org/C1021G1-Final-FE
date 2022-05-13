import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
// import {BodyComponent} from "./body/body.component";
import {CheckinComponent} from "./checkin-online/checkin.component";
import { BaggageComponent } from './baggage-regulations/baggage.component';
import { DialogSignUpTestComponent } from './dialog-sign-up-test/dialog-sign-up-test.component';
import { DialogSignInTestComponent } from './dialog-sign-in-test/dialog-sign-in-test.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [CheckinComponent, BaggageComponent, DialogSignUpTestComponent, DialogSignInTestComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatDialogModule
  ]
})
export class LayoutModule { }
