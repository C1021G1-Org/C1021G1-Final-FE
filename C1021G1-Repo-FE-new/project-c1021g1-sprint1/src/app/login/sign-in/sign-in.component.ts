import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ForgetedPasswordComponent} from "../forgeted-password/forgeted-password.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userForm: FormGroup;
  emailNotExist: boolean;
  checkPassword: boolean;
  checkRememberMe: boolean;
  email: string;
  roles: string[] = [];
  loginOk : Boolean = false;
  checkEmail: boolean;
  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public invalid: any,
  ) {}

  onNoClick(): void {
    if(this.userForm.valid){
      this.invalid = true
    }else {
     this.invalid = false
    }
    console.log(this.invalid)
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.userForm = new FormGroup({
      email: new FormControl(this.email,[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required)
    })
  }

  signIn(){
    if(this.userForm.invalid){
      if(this.userForm.get('email').invalid){
        this.checkEmail = true;
      }this.checkPassword = true;
    }else {
      this.checkEmail = false;
      this.checkPassword = false;
      this.loginService.signIn(this.userForm.value).subscribe(data =>{
        this.roles  = [];
        let lengthRoles = data.roles.length;
        console.log(this.roles.toString());
        this.emailNotExist = false;
        this.checkPassword = false;
        for(let r = 0;r<lengthRoles;r++){
          this.roles.push(data.roles[r].authority)
        }
        sessionStorage.setItem('roles',this.roles.toString());
        sessionStorage.setItem('email',data.email);
        sessionStorage.setItem('token',data.token);
        localStorage.setItem('roles',this.roles.toString());
        localStorage.setItem('email',this.userForm.get('email').value);
        localStorage.setItem('ps',this.userForm.get('password').value);
        localStorage.setItem('token',data.token);
        if (data.email == "employee@gmail.com"){
          this.loginOk = true;
        }else{
          this.loginOk = false;
        }
        if(this.checkRememberMe){
          localStorage.setItem('email',data.email);
        }else localStorage.setItem('email','');
        console.log(sessionStorage.getItem('email'));
        this.onNoClick()
      },error =>{

        console.log(error)
        this.loginOk = false;
        try{
          if(error.error.includes('email')){
            this.emailNotExist = true;
            this.checkPassword = false;
          }else {
            this.emailNotExist = false;
            this.checkPassword = true;
          }
        }catch (e) {
          console.log(e)
        }

        // this.onNoClick()
      })
    }

  }

  remember(rememberE: HTMLInputElement) {
    if(rememberE.checked){
      this.checkRememberMe = true;
    }else {
      this.checkRememberMe = false;
    }
  }

  openDialog(): void {
    this.onNoClick();
    const dialogRef = this.dialog.open(ForgetedPasswordComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
