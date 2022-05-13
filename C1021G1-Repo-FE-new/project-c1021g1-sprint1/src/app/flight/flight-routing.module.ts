import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFlightComponent} from "./list-flight/list-flight.component";
import {CreateFlightComponent} from "./create-flight/create-flight.component";
import {EditFlightComponent} from "./edit-flight/edit-flight.component";


const routes: Routes = [
  {
    path: 'flight', component: ListFlightComponent
  },
  {
    path : 'create', component: CreateFlightComponent
  },
  {
    path : 'update/:id', component: EditFlightComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
