import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteEmployeeComponent} from "./delete-employee/delete-employee.component";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {BrowserModule} from "@angular/platform-browser";
import {EmployeeRoutingModule} from "./employee-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [DeleteEmployeeComponent, ListEmployeeComponent, CreateEmployeeComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule
  ]
})
export class EmployeeModule { }
