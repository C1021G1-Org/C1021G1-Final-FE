import {Component, Inject, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICustomer} from "../model/ICustomer";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  customers: ICustomer[];
  customer: any = '';
  id: any;

  constructor(private customerService: CustomerService,
              private dialog: MatDialogRef<DeleteCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.data.data1;
    this.customerService.finByIdCustomers(this.id).subscribe(data => {
      console.log(data);
      this.customer = data;
    });
  }

    //LongLT trien khai xoa
    submitDelete() {
        this.customerService.deleteCustomer(this.id).subscribe( () => {
          console.log("Đã xóa được dữ liệu");
          this.dialog.close()
          this.snackBar.open("Đã xóa thành công", '', {
            duration: 2000
          })
        });
    }
}
