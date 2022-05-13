import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  employee: any = this.data.employee;

  constructor(private dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar,
              private employeeService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.data.employee.id).subscribe(()=>{
      this.snackBar.open("Xoá thành công!",'ok',{
        duration: 2000,
        verticalPosition: "top"
      })
      this.dialogRef.close();
    },
        error => {
      this.snackBar.open("Xoá thất bại!",'error',{
        duration: 2000
      })
      this.dialogRef.close();
    })
  }
}
