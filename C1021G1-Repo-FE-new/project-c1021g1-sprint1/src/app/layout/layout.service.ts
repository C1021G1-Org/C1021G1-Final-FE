import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private baseFlightURL = 'http://localhost:8080/api/flight';
  constructor(private httpClient: HttpClient) {
  }
  getListAllFlight() {
    return this.httpClient.get(this.baseFlightURL + "/listTen");
  }
}
