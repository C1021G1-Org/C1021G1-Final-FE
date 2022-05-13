import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {News} from "../news";
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit {
  id: number;
  newsDetail: any;

  constructor(private service: NewsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.findNewsById(this.id).subscribe(data => {
      this.newsDetail = data;
    })
  }

}
