import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FlightRoutingModule} from "./flight/flight-routing.module";
import {ReportRoutingModule} from "./report/report-routing.module";
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {EmployeeRoutingModule} from "./employee/employee-routing.module";
import {TicketRoutingModule} from "./ticket/ticket-routing.module";
import {CustomerRoutingModule} from "./customer/customer-routing.module";
import {ListSearchFlightComponent} from "./flight/list-search-flight/list-search-flight.component";
import {ListNewsComponent} from "./news/list-news/list-news.component";
import {NewsRoutingModule} from "./news/news-routing.module";


const routes: Routes = [
  {
    path: 'home', loadChildren: () => import ('./layout/layout.module').then(module => module.LayoutModule)
  },
  {
    path: '', loadChildren: () => import ('./layout/layout.module').then(module => module.LayoutModule)
  },
  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'flight', loadChildren: () => import('./flight/flight.module').then(mod => mod.FlightModule)
  },
  {
    path: 'report', loadChildren: () => import ('./report/report.module').then(module => module.ReportModule)
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },
  {
    path: 'customer', loadChildren: () => import ('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'flight/search',
    component: ListSearchFlightComponent
  },{
    path: 'news', loadChildren: () => import ('./news/news.module').then(module => module.NewsModule)
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes), FlightRoutingModule,ReportRoutingModule,EmployeeRoutingModule,TicketRoutingModule,CustomerRoutingModule,NewsRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
