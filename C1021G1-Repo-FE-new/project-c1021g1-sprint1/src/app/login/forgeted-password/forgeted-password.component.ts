import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-forgeted-password',
  templateUrl: './forgeted-password.component.html',
  styleUrls: ['./forgeted-password.component.css']
})
export class ForgetedPasswordComponent implements OnInit {
  formForgotPs: FormGroup;
  emailNotExist: boolean;
  checkPassword: any;
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<ForgetedPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public invalid: any,
  ) { }

  ngOnInit(): void {
    this.formForgotPs = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',this.checkPass),
      confirmPassword: new FormControl('')
    })
  }

  Update() {
    if(this.formForgotPs.valid){
      this.loginService.changPs(this.formForgotPs.value).subscribe(data => {
        this.ngOnInit();
        this.emailNotExist = false;
        this.checkPassword = false;
        this.onNoClick()
      },error => {
        this.emailNotExist = true;
        this.checkPassword = true;
      })
    }else {
      this.emailNotExist = true;
      this.checkPassword = true;
    }

  }

  checkPass(psInput: AbstractControl): ValidationErrors{
    let check = true;
    let password = psInput.value;
    if(password.length<8&&password.length>0){
      return{
        'errorPs': true,
      }
    }

    for(let i = 0;i<password.length;i++){
      if(!isNaN(password[i])){
        console.log(password[i]);
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }
    for(let i = 0;i<password.length;i++){
      if((isNaN(password[i]))&&(password[i] == password[i].toUpperCase())){
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }

    for(let i = 0;i<password.length;i++){
      if((isNaN(password[i]))&&(password[i] == password[i].toLowerCase())){
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }
    return null;
  }

  checkPsMatching() {
    let ps = this.formForgotPs.get('password').value;
    let confirmPs = this.formForgotPs.get('confirmPassword');
    if(ps !== confirmPs.value){
      confirmPs.setErrors({
        'mustMatching': true
      });
    }else {
      confirmPs.setErrors(null);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
