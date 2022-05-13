import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeDto} from "./dto/EmployeeDto";
import {EmployeeType} from "./model/employeeType";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeURL = 'http://localhost:8080/api/employee'

  constructor(private httpClient: HttpClient) { }

  // getAllEmployee(number: number) {
  //   const token = sessionStorage.getItem('token');
  //   const header = {
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer${token}`};
  //   return this.httpClient.get(this.employeeURL + '?page=' + number, {headers : header});
  // }
  //
  // getAllEmployeeNotPagination() {
  //   return this.httpClient.get(this.employeeURL + '/not-pagination')
  // }
  //
  // deleteEmployee(id: number){
  //   const token = sessionStorage.getItem('token');
  //   const header = {
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer${token}`};
  //   return this.httpClient.delete(this.employeeURL + '/delete/' + id, {headers: header});
  // }
  //
  // findById(id: number) {
  //   const token = sessionStorage.getItem('token');
  //   const header = {
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer${token}`};
  //   return this.httpClient.get(this.employeeURL + '/' + id, {headers: header});
  // }
  //
  // search(name: string, code: string, email: string, page: number) {
  //   const token = sessionStorage.getItem('token');
  //   const header = {
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer${token}`};
  //   return this.httpClient.get(this.employeeURL + '/search?name=' + name + '&code=' + code + '&email=' + email + '&page=' + page, {headers: header});
  // }
  getAllEmployee(number: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '?page=' + number,{headers: header});
  }

  getAllEmployeeNotPagination() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '/not-pagination',{headers: header})
  }

  deleteEmployee(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.delete(this.employeeURL + '/delete/' + id,{headers: header});
  }

  findById(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '/' + id,{headers: header});
  }

  search(name: string, code: string, email: string, page: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '/search?name=' + name + '&code=' + code + '&email=' + email + '&page=' + page,{headers: header});
  }

  // SonDCM

  findByIdSon(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '/find-id/' + id,{headers: header})
  }

  createEmployee(employee: EmployeeDto) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.post(this.employeeURL + '/createEmployee', employee, {headers: header});
  }

  getAllEmployeeType() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<EmployeeType[]>(this.employeeURL + '/findAllEmployeeType',{headers: header})
  }

  editEmployee(employee: EmployeeDto) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.post(this.employeeURL + "/editEmployee", employee,{headers: header})
  }
}
