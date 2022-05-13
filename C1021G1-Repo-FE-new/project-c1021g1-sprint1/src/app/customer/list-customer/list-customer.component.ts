import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {ICustomer} from "../model/ICustomer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  indexPagination: number = 0;
  totalPagination: number;
  customerList: ICustomer[] = [];
  customer: ICustomer;
  checkNull: boolean = false;
  totalPaginationRecord: number;
  searchForm = new FormGroup( {
    value: new FormControl(''),
    value2: new FormControl('')
  });

  constructor(private customerService: CustomerService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerService.getAllCustomer(0).subscribe(data => {
      this.customerList = data['content'];
      console.log(data)
      this.totalPagination = data['totalPages'] - 1;
    });
  }

//LongLT triển khai tìm kiếm
  searchAll(value: string, value2: string, page = 0) {
    // if (value2 == '') {
    //   this.snackBar.open('Vui lòng nhập kí tự', 'Lỗi', {
    //     duration: 2000
    //   })
    // }else {
    this.customerService.searchCustomer(value, value2.trim(), page).subscribe(data => {
      if (data == null) {
        this.customerList = [];
        this.checkNull = true;
        this.snackBar.open('Tìm kiếm không thành công', 'Lỗi', {
          duration: 2000
        })
      } else {
        this.customerList = data['content'];
        this.indexPagination = 0;
        this.totalPagination = data['totalPages'] - 1;
        this.checkNull = false;
      }
    });

}

  // << LongLT phân trang
  firstPage(option: string, keyword: string) {
    this.indexPagination = 0;
    this.customerService.searchCustomer(option, keyword, this.indexPagination).subscribe(data => {
      this.customerList = data['content'];
    });
  }

// > LongLT phân trang
  nextPage(option: string, keyword: string) {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    } else {
      this.customerService.searchCustomer(option, keyword, this.indexPagination).subscribe(data => {

        this.customerList = data['content'];


      })
    }
  }

// <  LongLT phân trang
  previousPage(option: string, keyword: string) {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
      this.ngOnInit();
    } else {
      this.customerService.searchCustomer(option, keyword, this.indexPagination).subscribe(data => {
        this.customerList = data['content'];
      })
    }

  }ng

// >>  LongLT phân trang
  lastPage(option: string, keyword: string) {
    this.indexPagination = this.totalPagination;
    this.customerService.searchCustomer(option, keyword, this.totalPagination).subscribe(data => {
      this.customerList = data['content'];
    })
  }

  //LongLT lấy id
  getInfor(id: number) {
    this.customerService.finByIdCustomers(id).subscribe(value => {
      this.customer = value;
    })
  }

  //LongLT triển khai xóa
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      console.log("Đã xó dữ liệu")
    }, error => {
      console.log("Có lỗi khi xóa dữ liệu")
    }, () => {
      console.log("Đã xóa thành công")
    });
  }

  //LongLT xóa bằng dialog
  openDialog(id: any) {
    this.customerService.finByIdCustomer(id).subscribe(data => {
      const dialogRef = this.matDialog.open(DeleteCustomerComponent, {
        width: "500px",
        data: {data1: id}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });

  }
}
