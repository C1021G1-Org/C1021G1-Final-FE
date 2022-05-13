import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {DeleteEmployeeComponent} from "./delete-employee/delete-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";


const routes: Routes = [
  {path: 'employee', component: ListEmployeeComponent},
  {path: 'employee/list', component: ListEmployeeComponent},
  {path: 'employee/delete/:id', component: DeleteEmployeeComponent},
  {path: 'employee/edit/:id', component: EditEmployeeComponent},
  {path: 'employee/create', component: CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
