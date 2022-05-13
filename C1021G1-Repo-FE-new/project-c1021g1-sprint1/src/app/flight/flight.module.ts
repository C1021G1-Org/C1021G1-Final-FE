import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlightRoutingModule} from './flight-routing.module';
import {CreateFlightComponent} from './create-flight/create-flight.component';
import {EditFlightComponent} from './edit-flight/edit-flight.component';
import {DeleteFlightComponent} from './delete-flight/delete-flight.component';
import {ListFlightComponent} from './list-flight/list-flight.component';
import {ListSearchFlightComponent} from './list-search-flight/list-search-flight.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [CreateFlightComponent, EditFlightComponent, DeleteFlightComponent, ListFlightComponent, ListSearchFlightComponent],
    imports: [
        CommonModule,
        FlightRoutingModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatFormFieldModule,
        FormsModule
    ],
  exports: [
    EditFlightComponent,
    CreateFlightComponent
  ]

})
export class FlightModule {
}
