import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Customer} from "../customer/model/customer";
import {Observable} from "rxjs";
import {SeatTicketDto} from "./model/seatTicketDto";
import {RoleEmailTicket} from "./model/roleEmailTicket";
import {FlightModel} from "./model/flightModel";
import {SeatTypeModel} from "./model/seatTypeModel";
import {Ticket} from "./model/ticketModel";
import {SenEmailTicket} from "./model/senEmailTicket";


const API_TICKET = "http://localhost:8080/api/ticket/"

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient) {}
  email = sessionStorage.getItem('email');
  role = sessionStorage.getItem('roles');
  token = sessionStorage.getItem('token');
  header = {
    'content-type': 'application/json',
    'Authorization': `Bearer${this.token}`
  };

  flightToTicket: any[]=[null,null];

  listIdTicket1: Ticket[] = [];
  listIdTicket2: Ticket[] = [];
  priceTicket1: number = 0;
  priceTicket2: number = 0;
  flight1: FlightModel;
  flight2: FlightModel;

  getFlightById(idFlight: number) {
    return this.http.get<FlightModel>(`${API_TICKET}flightTicket/` + idFlight,{headers: this.header})
  }

  getSeatTypeTicket() {
    return this.http.get<SeatTypeModel[]>(`${API_TICKET}seatTypeTicket`,{headers: this.header})
  }


  getListTicketType(idFlight: number, typeSeat: string) {
    return this.http.get<Ticket[]>(`${API_TICKET}listTicketType?id=` + idFlight + `&typeSeat=` + typeSeat,{headers: this.header})
  }

  // http://localhost:8080/api/listTicketType?id=2&typeSeat=vip

  updateTicketFirst(idFlight: number, typeSeat: string, value: Ticket) {
    console.log(idFlight)
    console.log(typeSeat)
    return this.http.patch(`${API_TICKET}firstUpdate?idFlight=` + idFlight + `&typeSeat=` + typeSeat, value,{headers: this.header})
  }

// ?idFlight=1&typeSeat=thương gia

  getIdForCreateTicket(data: RoleEmailTicket) {
    return this.http.post(`${API_TICKET}getIdByEmail`, data)
  }

  getListSeatTicket(idFlight: number, typeSeat: string) {
    return this.http.get<SeatTicketDto[]>(`${API_TICKET}getListSeat?idFlight=` + idFlight + `&typeSeat=` + typeSeat,{headers: this.header})
  }

// +`&page=`+index

  getListTicketByIdSeat(arrValue:number[]) {

    return this.http.post<Ticket[]>(`${API_TICKET}getTicketBySeat`,arrValue)
  }


  getAllTicket(index: number) {// Display List Ticket
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get<any>(`${API_TICKET}` + 'page?page=' + index, {headers: this.header})
  }

  getAllTicketNotPagination(){
    return this.http.get<any>(`${API_TICKET}` + 'not-pagination',{headers: this.header})
  }

  getTicketByIdDto(id) { // findById Ticket
    return this.http.get<any>(`${API_TICKET}page/${id}`,{headers: this.header});
  }

  getDeleteTicket(idTicket) { // Delete Ticket
    // @ts-ignore
    return this.http.patch<any>(`${API_TICKET}delete/${idTicket}`,{headers: this.header});
  }

  search(buyer: string, toFlight: string, fromFlight: string, code:string, index: number) {
    return this.http.get<Ticket[]>(`${API_TICKET}search`+ '?buyer=' + buyer + '&toFlight=' + toFlight + '&fromFlight=' + fromFlight + '&code=' + code + '&page=' + index,{headers: this.header})
  }


  getAllTicketByCustomerId(id: number,index:number): Observable<any> {
    return this.http.get<any>(API_TICKET + "list/" + id+ '?page=' + index,{headers: this.header});
  }

  getHistoryTicketByCustomerId(id: number,index:number): Observable<any> {
    return this.http.get<any>(API_TICKET + "listHistory/" + id+ '?page=' + index,{headers: this.header});
  }


  payTicket(code: any): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "pay/" + code,{headers: this.header});
  }

  payTickets(code: any): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "pays/" + code,{headers: this.header});
  }

  getTotalPrice(code: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(API_TICKET + "getPrice/" + code,{headers: this.header});
  }

  abortTicket(code: string): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "abort/" + code,{headers: this.header});
  }

  getTicketInfo(code: string): Observable<any> {
    return this.http.get<any>(API_TICKET + code,{headers: this.header})
  }

  confirmEmailPayment(finalPrice: number, nameCustomer: string, quantity: number): Observable<any> {
    // @ts-ignore
    return this.http.put<any>(API_TICKET + "sendmail" + "?finalPrice=" + finalPrice + "&nameCustomer=" + nameCustomer + "&quantity=" + quantity,{headers: this.header});
  }

  getAllTicketByCustomerEmail(index: number): Observable<any> {
    let roles =sessionStorage.getItem('roles');
    return this.http.get<any>(API_TICKET + "listEmail/" + this.email + '?page=' + index + '&ROLE=' +roles);
  }

  getHistoryTicketByCustomerEmail(index: number): Observable<any> {
    let roles =sessionStorage.getItem('roles');
    return this.http.get<any>(API_TICKET + "listHistoryEmail/" + this.email + '?page=' + index + '&ROLE=' + roles);
  }

  sortHistoryTicketByCustomerEmail(index: number): Observable<any> {
    const email = "Customer2@gmail.com"
    return this.http.get<any>(API_TICKET + "sortListHistoryEmail/" + email + '?options=id' + '&ROLE=' + this.role + '&page=' + index,{headers: this.header});
  }


  searchListHistoryTicketList(statusTicket: string, startFlight: string, buyer: string, index: number): Observable<any> {
    let roles =sessionStorage.getItem('roles');
    return this.http.get<any>(API_TICKET + "searchListHistoryEmail/" + this.email + "?statusTicket=" + statusTicket +'&ROLE=' + roles + "&startFlight=" + startFlight + "&buyer=" + buyer + '&page=' + index,{headers: this.header});
  }



  getTicketById(id: number){
    return this.http.get<any>(API_TICKET + 'findTicket/' + id,{headers: this.header})
  }

  editTicketById(id: number, data){
    return this.http.patch<any>(API_TICKET + 'editTicket/' + id, data,{headers: this.header})
  }

  sendEmail(emailDto:SenEmailTicket){
    return this.http.post(`${API_TICKET}sendEmailTicket`,emailDto)
  }
}







