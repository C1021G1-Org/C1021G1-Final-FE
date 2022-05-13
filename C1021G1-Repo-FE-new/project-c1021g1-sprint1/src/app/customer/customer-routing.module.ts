import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCustomerComponent} from "./list-customer/list-customer.component";

import {DeleteCustomerComponent} from "./delete-customer/delete-customer.component";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {ViewCustomerComponent} from "./view-customer/view-customer.component";
import {EditCustomerByEmployeeComponent} from "./edit-customer-by-employee/edit-customer-by-employee.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";



const routes: Routes = [
  {
    path: 'list-customer', component: ListCustomerComponent
  },

  {
    path: 'create-customer', component: CreateCustomerComponent
  },

  {
    path: 'view-customer', component: ViewCustomerComponent
  },
  {
    path: 'edit-personal', component: EditCustomerByEmployeeComponent
  },
  {
    path: 'edit-customer/:id', component: EditCustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
