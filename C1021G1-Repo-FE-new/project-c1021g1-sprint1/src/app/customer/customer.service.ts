
import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";

import {IPersonalDto} from "./model/IPersonalDto";
import {Observable} from "rxjs";


// import {Observable, throwError} from "rxjs";
import {ICustomerDto} from "./dto/ICustomerDto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private readonly URL_BE = 'http://localhost:8080/api';
  // httpOptions = {
  //   headers: new HttpHeaders( {
  //     'Content-Type': 'application/json'
  //   })
  // };

  private readonly URL_CT = 'http://localhost:8080';

  token = sessionStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; text/plain;charset=UTF-8',
      'Authorization': `Bearer${this.token}`
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  header = {
    'content-type': 'application/json',
    'Authorization': `Bearer${this.token}`};



  constructor(private httpClient: HttpClient) {
  }


  // token = sessionStorage.getItem('token');
  email = sessionStorage.getItem('email');
// email = 'DuongPro223@gmail.com'; // test token
  role = sessionStorage.getItem('roles');






  //LongLT lấy list customer
  getAllCustomer(index: number) {
        return this.httpClient.get<ICustomer[]>(this.URL_BE + "/customer/list?page=" + index,{headers: this.header})
  }

  // //LongLT lấy list customerType
  // getAllCustomerType() {
  //   return  this.httpClient.get<ICustomerType[]>(this.URL_BE + "/customerType")
  // }
  // //LongLT lấy list country
  // getAllCountries() {
  //   return this.httpClient.get<ICountries[]>(this.URL_BE + "/customer/countries")
  // }

  //LongLT lay id để xóa
  finByIdCustomers(id: number) {

    return this.httpClient.get<ICustomer>(this.URL_BE +'/customer/'+ id,{headers: this.header})
  }
  //LongLT triển khai xóa
  deleteCustomer(idCustomer: number){
    return this.httpClient.delete(this.URL_BE + '/customer/delete/'+ idCustomer,);
  }
  //LongLT triển khai tìm kiếm
  searchCustomer(value: string, value2: string, page: number) {
      return this.httpClient.get<any>(this.URL_BE + '/customer/search?option=' + value + '&keyword=' + value2 + '&page=' + page,{headers: this.header});
  }
  // ThangDBX lấy id
  findPersonalId(id : number){
    return this.httpClient.get(this.URL_BE + '/customer/view/' + id);
  }

// ThangDBX update thong tin ca nhan
  updatePersonalInfo(id : number, data : IPersonalDto): Observable<IPersonalDto> {
    return this.httpClient.patch<IPersonalDto>(this.URL_BE + '/customer/edit/' + id, data,{headers: this.header})
  }

  getAllCustomerType() {
    return this.httpClient.get<ICustomerType[]>(this.URL_BE + "/customer/customerType",{headers: this.header})
  }

  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_CT + "/country/api/v1",{headers: this.header})
  }


  // TinhHD lấy id để sửa
  finByIdCustomer(id: number): Observable<ICustomerDto> {
    return this.httpClient.get<ICustomerDto>(this.URL_BE + '/customer/' + id,{headers: this.header})
  }

  //TinhHD thêm một đối tượng
  save(data: ICustomerDto): Observable<ICustomerDto> {
    return this.httpClient.post<ICustomerDto>(this.URL_BE + '/customer/create', JSON.stringify(data), this.httpOptions);
  }

  customer: ICustomerDto

  //TinhHD update một đối tượng
  updateCustomer(id: number, data): Observable<ICustomerDto> {
    console.log(id)
    console.log(data)
    return this.httpClient.patch<ICustomerDto>(this.URL_BE + '/customer/' + id, data,{headers: this.header});

  }

  findPersonalEmail(){
    return this.httpClient.get(this.URL_BE + '/customer/find/' + this.email,{headers: this.header});
  }
}
