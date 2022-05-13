import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "../model/news";
import {NewDto} from "../dto/newDto";


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
   token = sessionStorage.getItem('token');
   header = {
    'content-type': 'application/json',
    'Authorization': `Bearer${this.token}`};
  constructor(private http: HttpClient) { }


  getAllNews(index: number): Observable<News[]>{
    return this.http.get<News[]>(this.URL+'/api/news/list-news?page=' + index);
  }
  saveNews(news): Observable<NewDto>{
    console.log(news);
    console.log(this.token);
    return this.http.post<NewDto>(this.URL+ '/api/news/create', JSON.stringify(news),{headers: this.header})
  }
  findNewsById(id: number): Observable<News>{
    return this.http.get<News>(this.URL+ '/api/news/list-news/' +id,{headers: this.header});
  }
  updateNews(newsDto: NewDto, id: number): Observable<NewDto>{
    console.log(newsDto)
    return this.http.patch<NewDto>(this.URL + '/api/news/update/' +id, JSON.stringify(newsDto), {headers: this.header});
  }
  deleteNews(id):Observable<News> {
    return this.http.delete<News>(this.URL + '/api/news/delete-news/' + id,{headers: this.header});
  }
  getAllNewsNotPaging() {
    return this.http.get<News[]>(this.URL + '/api/news/news-not-pagination');
  }
}
