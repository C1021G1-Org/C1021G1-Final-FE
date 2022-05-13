import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICustomer} from "../model/ICustomer";
import {SignInComponent} from "../../login/sign-in/sign-in.component";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../../login/change-password/change-password.component";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer : ICustomer;
  log : ICustomer;

  constructor(private customerServie : CustomerService,
              private activeRouter : ActivatedRoute,
              private router : Router,
              private matDialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.customerServie.findPersonalEmail().subscribe((data: ICustomer) => {
      this.customer = data;
      console.log(data);
    })

  }


  openDialogChanePS() {
    const dialogRef = this.matDialog.open(ChangePasswordComponent,{
      width:"500px",
      data: {'invalid': 'false'}
    });
  }

  // openDialogSignIn() {
  //   const dialogRef = this.matDialog.open(SignInComponent,{
  //     width:"500px",
  //     data: {'invalid': 'false'}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.email = sessionStorage.getItem('email');
  //     console.log(this.email.includes('@'));
  //     if(this.email.includes('admin@gmail.com')){
  //       this.loginOk = true
  //       this.openSnackBar('Đăng nhập thành công','đóng');
  //       this.router.navigateByUrl('/home').then(r => {
  //         console.log("suscess");
  //       });
  //     }else if(this.email.includes('employee@gmail.com')){
  //       this.loginOk = true;
  //       this.openSnackBar('Đăng nhập thành công','đóng');
  //       this.router.navigateByUrl('/home').then(r => {
  //         console.log("suscess");
  //       });
  //     }else if(this.email.includes('@gmail.com')){
  //       this.loginOk = true;
  //       this.openSnackBar('Đăng nhập thành công','đóng');
  //       this.router.navigateByUrl('/home').then(r => {
  //         console.log("suscess");
  //       });
  //     }{
  //       this.loginOk = false;
  //     }
  //   });
  // }
}
