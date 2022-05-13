import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;

  constructor(private loginService: LoginService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public invalid: any) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.checkPass]),
      newPassword: new FormControl('', [Validators.required, this.checkPass]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  changePassWord() {
    if (this.changePassForm.valid)
    console.log(1234567);
    console.log(this.changePassForm.value)
    this.loginService.changePassword(this.changePassForm.value).subscribe(data => {
      console.log(data);
    })
  }

  openSnackBar(message: string, action: string) {
    this.onNoClick();
    this._snackBar.open(message, action);
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
    let ps = this.changePassForm.get('password').value;
    let confirmPs = this.changePassForm.get('confirmPassword');
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
