import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticComponent} from "./statistic/statistic.component";
import {CreateReportComponent} from "./create-report/create-report.component";


const routes: Routes = [
  {path: 'report',component: StatisticComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
