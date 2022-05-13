import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../model/employee";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})


export class ListEmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employee: Employee;
  totalEmployeeRecord: number;
  totalEmployee: number;
  indexEmployee: number = 0;
  checkNull: boolean = false;
  findForm = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployee(0).subscribe(data => {
      this.employees = data['content'];
      this.totalEmployee = data['totalPages'] - 1;
      this.totalEmployeeRecord = data['totalElements'];
    });
  }

  dialogDeleteCustomer(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      const x = this.dialog.open(DeleteEmployeeComponent, {
        width: '800px',
        data: {employee: data}
      })
      x.afterClosed().subscribe(() => {
        this.indexEmployee = 0;
        this.ngOnInit();
      }, error => {
      })
    })
  }

  firstPage(name: string, code: string, email: string) {
    this.indexEmployee = 0;
    this.employeeService.search(name.trim(),code.trim(),email.trim(),this.indexEmployee).subscribe(data => {
      this.employees = data['content'];
    })
  }

  previousPage(name: string, code: string, email: string) {
    this.indexEmployee = this.indexEmployee - 1;
    if (this.indexEmployee < 0) {
      this.indexEmployee = 0;
      this.ngOnInit();
    } else {
      this.employeeService.search(name.trim(),code.trim(),email.trim(),this.indexEmployee).subscribe(data => {
        this.employees = data['content'];
      })
    }
  }

  nextPage(name: string, code: string, email: string) {
    this.indexEmployee = this.indexEmployee + 1;
    if (this.indexEmployee > this.totalEmployee) {
      this.indexEmployee = this.indexEmployee - 1;
    } else
      this.employeeService.search(name.trim(),code.trim(),email.trim(),this.indexEmployee).subscribe(data => {
        this.employees = data['content'];
      })
  }

  lastPage(name: string, code: string, email: string) {
    this.indexEmployee = this.totalEmployee;
    this.employeeService.search(name.trim(),code.trim(),email.trim(),this.totalEmployee).subscribe(data => {
      this.employees = data['content'];
    })
  }

  findPage(name: string, code: string, email: string, page: number) {
    if (this.totalEmployee>=(page - 1)) {
      this.indexEmployee = page - 1;
      this.employeeService.search(name.trim(),code.trim(),email.trim(),this.indexEmployee).subscribe(data => {
        this.employees = data['content'];
      })
    } else {
      this.employees = [];
      this.checkNull = true;
      this.indexEmployee = 0;
      this.snackBar.open("Không có trang phù hợp!",'',{
        duration: 2000,
        verticalPosition: "top"
      });
    }
  }

  search(name: string, code: string, email: string, page = 0) {
    this.employeeService.search(name.trim(),code.trim(),email.trim(),page).subscribe(data => {
      this.employees = data['content'];
      this.indexEmployee = 0;
      this.totalEmployee = data['totalPages'] - 1;
      this.totalEmployeeRecord = data['totalElements'];
      this.checkNull = false;
      this.snackBar.open("Tìm kiếm thành công!",'ok', {
        duration: 2000,
        verticalPosition: "top"
      })
    },error => {
      this.employees = [];
      this.checkNull = true;
      this.indexEmployee = 0;
      this.snackBar.open("Tìm kiếm thất bại!",'error', {
        duration: 2000,
        verticalPosition: "top"
      })
    })
  }
}
