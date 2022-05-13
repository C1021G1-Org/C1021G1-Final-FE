import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogSignUpTestComponent} from "../dialog-sign-up-test/dialog-sign-up-test.component";
import {DialogSignInTestComponent} from "../dialog-sign-in-test/dialog-sign-in-test.component";
import {SignUpComponent} from "../../login/sign-up/sign-up.component";
import {SignInComponent} from "../../login/sign-in/sign-in.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignInResult} from "../../login/model/sign-in-result";
import {LoginService} from "../../login/login.service";
import {Login} from "../../login/model/login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hidden : boolean;
  loginOk:boolean= false;
  email: string ='';
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private serviceLogin: LoginService
  ) {
    this.email = localStorage.getItem('email');
    if(this.email!=null &&this.email.includes('@gmail.com')){
      this.loginOk =true;
      sessionStorage.setItem('roles',localStorage.getItem('roles'));
      sessionStorage.setItem('email',localStorage.getItem('email'));
      sessionStorage.setItem('token',localStorage.getItem('token'));
    }else {
      this.email='email';
      this.loginOk = false;
    }
  }

  ngOnInit(): void {
    this.rememberLogin();
    //this.hiddenRoles()
  }

  // openDialogDetail() {
  //   const dialogRef = this.matDialog.open(View,{
  //       width:"50%"
  //   });
  // }

  rememberLogin(){
    let user: Login ={};
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('ps');
    if(email!=null && password!=null){
      user.email =email;
      user.password=password;
     this.serviceLogin.rememberSignIn(user);


    }
    // let pass = localStorage.getItem('email');
    // let email = localStorage.getItem('email');
  }
  openDialogSignIn() {
    const dialogRef = this.matDialog.open(SignInComponent,{
      width:"500px",
      data: {'invalid': 'false'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.email = sessionStorage.getItem('email');
      console.log(this.email.includes('@'));
      if(this.email.includes('admin@gmail.com')){
        this.loginOk = true
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }else if(this.email.includes('employee@gmail.com')){
        this.loginOk = true;
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }else if(this.email.includes('@gmail.com')){
        this.loginOk = true;
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }{
        this.loginOk = false;
      }
    });
  }
  hiddenRoles(){
    sessionStorage.getItem("roles").includes("EMPLOYEE",0)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 1000,
    });
  }

  logOut() {
    sessionStorage.setItem('email','');
    sessionStorage.setItem('roles','');
    sessionStorage.setItem('token','');
    localStorage.setItem('email','');
    localStorage.setItem('roles','');
    localStorage.setItem('token','');
    this.email ='';
    this.loginOk = false;
    this.router.navigateByUrl('home').then(r => {
      console.log("suscess");
    });
  }
}
