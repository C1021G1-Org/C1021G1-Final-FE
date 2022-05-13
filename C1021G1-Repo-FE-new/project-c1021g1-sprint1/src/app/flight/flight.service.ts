import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airline} from "./model/airline";
import {Flight} from "./model/flight";
import {FlightDto} from "./dto/flight-dto";
import {SearchOption} from "./model/search-option";
import {ResultSearch} from "./model/ResultSearch";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private http: HttpClient
  ) { }
  private baseURL = 'http://localhost:8080/api/flight';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // Hieu
  getListAllFlight(index: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get(this.baseURL + "/list?page=" + index,{headers: header});
  }
// Hieu
  getListAllFlightNotPagination() {
    return this.http.get(this.baseURL + "/list-not-pagination");
  }
// Hieu
  getListAllAirlineType() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get(this.baseURL + "/listAirlineType",{headers: header});
  }
// Hieu
  search(fromFlight: string, toFlight: string, dateStart: string, dateEnd: string, index: any)  {
    return this.http.get(this.baseURL + '/search?fromFlight=' + fromFlight + '&toFlight='
                          + toFlight + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&page=' + index)
  }
// Hieu
  getFlightById(id: number){
    return this.http.get(this.baseURL + '/find-id/' + id);
  }
// Hieu
  deleteFlight(id) {
    return this.http.delete(this.baseURL + '/delete/' + id);
  }


  //TrongHD lấy list airline
  getAirlineType() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get<Airline[]>(this.baseURL + '/listAirlineType',{headers: header})
  }

  //TrongHD lấy thông tin theo id
  getInfo(id : number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get<Flight>(this.baseURL + "/" + id,{headers: header})
  }

  //TrongHD thêm mới chuyến bay
  createFlight(flight) {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(flight);
    return this.http.post<FlightDto>(this.baseURL + '/create', body, {headers: header});
  }

  //TrongHD sửa chuyến bay
  updateFlight(id: number, data) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.patch<FlightDto>(this.baseURL + '/update/' + id, data,{headers: header});
  }



  searchFlight(searchOption: SearchOption): Observable<ResultSearch> {

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT, POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer'
    });
    const body = JSON.stringify(searchOption);
    console.log(body);
    return this.http.post<ResultSearch>(this.baseURL + "/searchAvailableFlight", body, {headers: header});
  }

  // getListAllFlight1(index: number) {
  //   return this.http.get(this.baseURL + "/list?page=" + index);
  // }

  listFlightByDate(date: string) {
    return this.http.get<any>(this.baseURL + "/searchByDateStart/" + date);
  }

}
