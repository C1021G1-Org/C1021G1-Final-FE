import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListHistoryTicketComponent} from "./list-history-ticket/list-history-ticket.component";
import {PaymentTicketComponent} from "./payment-ticket/payment-ticket.component";
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";
import {ListTicketComponent} from "./list-ticket/list-ticket.component";
import {PrintTicketComponent} from "./print-ticket/print-ticket.component";
import {DetailTicketComponent} from "./detail-ticket/detail-ticket.component";
import {CreateTicketComponent} from "./create-ticket/create-ticket.component";

const routes: Routes = [
  {path:"ticket",pathMatch:"full",redirectTo:"historyPayment"},
  {path:"historyPayment",component:ListHistoryTicketComponent},
  {path:"paymentTicket",component:PaymentTicketComponent},
  {path:"editTicket/:id",component:EditTicketComponent},
  {path:"ticket/list",component:ListTicketComponent},
  {path:"printTicket/:id",component:PrintTicketComponent},
  {path: 'ticket/detail', component: DetailTicketComponent},
  {path: 'ticket/create', component: CreateTicketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
