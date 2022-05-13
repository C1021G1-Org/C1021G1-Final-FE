import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeType} from "../model/employeeType";
import {Employee} from "../model/employee";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee;
  listEmployeeType: EmployeeType[] = [];
  createEmployeeForm : FormGroup = new FormGroup({
    id : new FormControl(''),
    name_Employee: new FormControl('',[Validators.required, Validators.minLength(6)]),
    code_Employee: new FormControl('' ,[Validators.required , Validators.pattern(/^(NV-|nv-)\d{3}$/)]),
    gender_Employee: new FormControl(''),
    birthday_Employee: new FormControl('',[Validators.required, this.checkAge]),
    phone_Employee: new FormControl('', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])\d{7}$/)]),
    email_Employee: new FormControl('',[Validators.required, Validators.email]),
    address_Employee: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id_employee_type: new FormControl('', [Validators.required]),
    del_Flag_Employee: new FormControl('', )
  }
)
  constructor(private employeeService: EmployeeService , private router: Router, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeType().subscribe(data => {
      this.listEmployeeType = data;
    });
  }

  createEmployee(){
    console.log(this.createEmployeeForm.value)
    this.employeeService.createEmployee(this.createEmployeeForm.value).subscribe(()=>{
      this.router.navigateByUrl('/employee');
      this.snackbar.open("Tạo mới thành công","OK", {
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      })
    },error =>{
        this.snackbar.open("Tạo mới không thành công.","OK", {
          duration: 2000,
          verticalPosition: 'top', // 'top' | 'bottom'
          horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
          panelClass: ['red-snackbar'],
        })
        console.log(error)
      }
    )
}
  checkAge(birthday : AbstractControl){
    console.log(birthday.value);
    const dayOfBirthObj = new Date(birthday.value)
    const dayOfBirth = Date.now() - dayOfBirthObj.getTime() - 8640000;
    const time = new Date(dayOfBirth);
    const age = time.getUTCFullYear()-1970;
    if(age < 18){
      return {"ageUnder" : true}
    }else{
      return null;
    }
  }

}

