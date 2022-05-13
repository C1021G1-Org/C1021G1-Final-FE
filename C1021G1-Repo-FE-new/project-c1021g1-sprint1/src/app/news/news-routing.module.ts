
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateNewsComponent} from "./create-news/create-news.component";
import {ListNewsComponent} from "./list-news/list-news.component";
import {DetailNewsComponent} from "./detail-news/detail-news.component";
import {EditNewsComponent} from "./edit-news/edit-news.component";


const routes: Routes = [
  {

    path:"list-news",
    component:ListNewsComponent
  },
  {
    path:"list-news/create",
    component:CreateNewsComponent
  },
  {
    path:"list-news/update/:id",
    component:EditNewsComponent
  },
  {
    path:"detail-news/:id",
    component: DetailNewsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
