import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeType} from "../model/employeeType";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  listEmployeeType : EmployeeType[];
  editEmployeeForm: FormGroup;
  private id: number;
  constructor( private employeeService: EmployeeService, private activatedRoute: ActivatedRoute,  private router: Router,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeType().subscribe(data => {


      this.listEmployeeType = data;
    });
    this.id = this.activatedRoute.snapshot.params.id;
    this.editEmployee();

  }
  checkAge(birthday : AbstractControl){

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
  update(){
    this.employeeService.editEmployee(this.editEmployeeForm.value).subscribe(data => {
      console.log(this.editEmployeeForm.value)
      this.router.navigateByUrl('/employee');
      this.snackbar.open("Cập nhật thành công.","OK", {
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      })
    },error =>{
      this.snackbar.open("Lưu không thành công.","OK",{
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      })
      console.log(error)
    })
  }
  private editEmployee() {
    this.editEmployeeForm  = new FormGroup({
      id : new FormControl(''),
      name_Employee: new FormControl('',[Validators.required, Validators.minLength(6)]),
      code_Employee: new FormControl('' ,[Validators.required , Validators.pattern(/^(NV-|nv-)\d{3}$/)]),
      gender_Employee: new FormControl(''),
      birthday_Employee: new FormControl('',[Validators.required, this.checkAge]),
      phone_Employee: new FormControl('', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])\d{7}$/)]),
      email_Employee: new FormControl('',[Validators.required, Validators.email]),
      address_Employee: new FormControl('', [Validators.required, Validators.minLength(3)]),
      employee_Type_Id: new FormControl(''),
      del_Flag_Employee: new FormControl('')
    })
    this.employeeService.findByIdSon(this.id).subscribe(value => {
      this.editEmployeeForm.patchValue(value);
    })
  }
}
