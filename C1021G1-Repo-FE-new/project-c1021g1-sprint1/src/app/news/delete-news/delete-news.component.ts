import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-delete-news',
  templateUrl: './delete-news.component.html',
  styleUrls: ['./delete-news.component.css']
})
export class DeleteNewsComponent implements OnInit {
  newId: number
  title: any;
  id: any;
  constructor(private dialog: MatDialogRef<DeleteNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private newsService: NewsService,
              private snackBar: MatSnackBar
  ) {
    this.newId = this.data
  }

  ngOnInit(): void {
  this.title = this.data.datal.titleNews;
    console.log(this.title)
  this.id = this.data.datal.id;
  }

  deleteNews() {
    this.newsService.deleteNews(this.id).subscribe(() => {
      this.dialog.close()
      this.snackBar.open('Đã xóa tin tức thành công', 'OK', {
        duration:2000
      });
    })
  }



}
