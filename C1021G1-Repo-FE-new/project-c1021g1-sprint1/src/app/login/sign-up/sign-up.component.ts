import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {Country} from "../model/country";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  passwordRegex = '([a-z]){0,}(?=.[0-9])([a-z]|[A-Z]|[0-9]).{0,}';
  phoneRegex = '([\+849|09])+[0-9]{8}';
  fullNameRegex = '[^0-9]{8,50}';
  idCardRegex = '[0-9]{12}';
  checkForm: boolean;
  labelEmail: boolean;
  labelPassword: boolean;
  labelConfirmPassword: boolean;
  labelPhone: boolean;
  labelFullName: boolean;
  labelBirthday: boolean;
  labelAddress: boolean;
  labelGender: boolean = false;
  labelIdCard: boolean;
  labelCountry: boolean;
  errorEmail: boolean;
  errorPassword: boolean;
  errorConfirmPassword: boolean;
  errorPhone: boolean;
  errorFullName: boolean;
  errorBirthday: boolean;
  errorAddress: boolean;
  errorGender: boolean;
  errorIdCard: boolean;
  errorCountry: boolean;
  countryList: Country[];
  signUpForm: FormGroup;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,this.checkPass]) ,
      confirmPassword: new FormControl('',Validators.required,),
      phone: new FormControl('',Validators.compose([Validators.required,Validators.pattern(this.phoneRegex)])),
      fullName: new FormControl('',[Validators.required,Validators.pattern(this.fullNameRegex)]),
      birthday: new FormControl('',[Validators.required, this.checkAge]),
      address: new FormControl('',[Validators.required]),
      gender: new FormControl('',[this.checkNull]),
      idCard: new FormControl('',[Validators.required, Validators.pattern(this.idCardRegex)]),
      country: new FormControl('',[this.checkNull])
    })
    this.loginService.getCountryList().subscribe(data=>{
      this.countryList = data;
      console.log(data)
    })
  }

  signUp() {
    if(this.signUpForm.invalid){
      this.checkForm = true;
    }else{
      this.checkForm = false;
      this.loginService.signUp(this.signUpForm.value).subscribe(data =>{
        this.openSnackBar('Đăng ký thành công','Đóng');
        this.router.navigateByUrl('/home').then(r => {
        });
      },error => {
        console.log(error);
        if((typeof error.error) == 'string'){
          let er = error?.error;
          this.errorPhone = er.includes('phone')?true:false;
          this.errorEmail = er.includes('email')?true:false;
          this.errorIdCard = er.includes('idCard')?true:false;
        }else {
          this.errorEmail  =false;
          this.errorPhone = false;
          this.errorIdCard = false;
        }
      })
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 1000,
    });
  }

  displayLabel(label) {
    this.errorEmail = false;
    this.checkForm = false;
    //this.hiddenLabel();
    switch (label){
      case `email`:
        this.labelEmail = true;
        break;
      case 'password':
        this.labelPassword =  true;
        break;
      case 'confirmPassword':
        this.labelConfirmPassword = true;
        break;
      case 'phone':
        this.labelPhone = true;
        break;
      case 'fullName':
        this.labelFullName = true;
        break;
      case 'birthday':
        this.labelBirthday = true;
        break;
      case 'address':
        this.labelAddress  = true;
        break;
      case 'gender':
        this.labelGender  = true;
        break;
      case 'idCard':
        this.labelIdCard = true;
        break;
      default :
        this.labelCountry  =true;
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

  // mustMatch(ps: string,confirm: string){
  //   return (form: FormGroup) =>{
  //     const password = form.controls[ps];
  //     const matchingConfirm = form.controls[confirm];
  //     if(password.value !== matchingConfirm.value && matchingConfirm.value.length>0){
  //       matchingConfirm.setErrors({
  //         mustMatch: true
  //       })
  //     }else matchingConfirm.setErrors(null);
  //     return null;
  //   }
  // }

  checkPsMatching() {
    let ps = this.signUpForm.get('password').value;
    let confirmPs = this.signUpForm.get('confirmPassword');
    if(ps !== confirmPs.value){
      confirmPs.setErrors({
        'mustMatching': true
      });
    }else {
      confirmPs.setErrors(null);
  }
}

checkAge(birthday: AbstractControl): ValidationErrors{
    let dayOfBirth = birthday.value;
  let birthdayToSeconds = new Date(dayOfBirth).getTime();
  let currentToSeconds = new Date().getTime();
  let between = currentToSeconds - birthdayToSeconds;
  let age = between/(60*60*24*1000*365);
  console.log(age<18|| age>150);
  if(age<18 || age>150){
    return {
      'errorAge': true
    }
  }
  return null;
}

checkNull(input : AbstractControl){
      if(input.value.toString()==''){
        console.log(input.value.toString());
        return {
          'inputNull': true
        }
    }
    return null;
}
}
