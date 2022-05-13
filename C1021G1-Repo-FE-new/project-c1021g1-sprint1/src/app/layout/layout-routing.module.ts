import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckinComponent} from "./checkin-online/checkin.component";
import {BodyComponent} from "./body/body.component";
import {BaggageComponent} from "./baggage-regulations/baggage.component";


const routes: Routes = [
  {path:'home/checkin',component:CheckinComponent},
  {path: '',component:BodyComponent},
  {path: 'home/baggage-regulation',component:BaggageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
