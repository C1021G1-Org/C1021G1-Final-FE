import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IReportAirline} from "./model/IReportAirline";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  URL_REPORT_PRICE = 'http://localhost:8080/api/report-price';
  URL_REPORT_EMPLOYEE = 'http://localhost:8080/api/report-employee';
  URL_REPORT = 'http://localhost:8080/api/report-airline';

  token = sessionStorage.getItem('token');
  header = {
    'content-type': 'application/json',
    'Authorization': `Bearer${this.token}`
  };

  constructor(private  httpClient: HttpClient) {
  }


  getAllReport(): Observable<any> {
    return this.httpClient.get<any>(this.URL_REPORT_PRICE,{headers:this.header});
  }

  getAllReportEmployee(month:number): Observable<any> {
    return this.httpClient.get<any>(this.URL_REPORT_EMPLOYEE + '?month='+month,{headers:this.header});
  }

  getAllReportAirline(fromDate: string,toDate: string):Observable<any>{
    return this.httpClient.get<any>(this.URL_REPORT+ '?fromDate='+fromDate+ '&toDate=' + toDate,{headers:this.header});
  }
}
