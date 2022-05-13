import { Component, OnInit } from '@angular/core';

import {News} from "../news";
import {MatDialog} from "@angular/material/dialog";
import {DeleteNewsComponent} from "../delete-news/delete-news.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  newsList : News[] = [];
  indexPagination: number = 0;
  totalPagination: number;
  listNewsNotPagination: News[] = [];
  checkRoleAdmin: boolean;
  constructor(private newsService : NewsService,
              private dialog : MatDialog,
              private snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.checkRoleAdmin = sessionStorage.getItem('email').includes('admin')?true:false;
    this.newsService.getAllNews(0).subscribe((data: any) => {
      this.newsList = data.content;
      this.totalPagination = data['totalPages'];
    })
    this.newsService.getAllNewsNotPaging().subscribe((data:any) => {
      this.listNewsNotPagination = data.content;
      if ((this.listNewsNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listNewsNotPagination.length / 5)) + 1;
      }
    })
    // this.appearButton();
  }
  openDialog(id: number) {
    this.newsService.findNewsById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteNewsComponent, {
        width: '500px',
        data: {datal: data},
      });
      dialogRef.afterClosed().subscribe(next => {
        this.ngOnInit();
        this.firstPage();
      });
    });
  }

  getNewsPerPage(pageNumber: number) {
    this.newsService.getAllNews(pageNumber).subscribe((data: any) => {
      this.newsList = data.content;
    });
  }


  firstPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      this.getNewsPerPage(this.indexPagination);
    } else {
      this.snackBar.open('Bạn đang ở trang cuối cùng', 'Ok', {
        duration: 2000
      })
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      this.getNewsPerPage(this.indexPagination);
    } else {
      this.snackBar.open('Bạn đang ở trang đầu tiên', 'Ok', {
        duration:2000
      })
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination -1;
    this.getNewsPerPage(this.indexPagination);
  }

  // appearButton() {
  //  this.checkRoleAdmin = sessionStorage.getItem('roles').includes('ADMIN', 0);
  // }

}
