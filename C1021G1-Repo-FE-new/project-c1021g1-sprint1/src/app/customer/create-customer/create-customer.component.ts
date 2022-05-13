import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ICustomerType} from "../model/ICustomerType";
import {ICountries} from "../model/ICountries";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ICustomer} from "../model/ICustomer";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})

export class CreateCustomerComponent implements OnInit {
  customerType: ICustomerType[];
  country: ICountries[];
  idCard: any;
  phone: any;
  emailValid: any;
  validation_messages = {
    nameCustomer: [
      {type: 'required', message: 'Vui lòng nhập họ và tên!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 40 kí tự!'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số!'}
    ],
    emailCustomer: [
      {type: 'required', message: '  Vui lòng nhập email!'},
      {type: 'email', message: '  Vui lòng nhập email đúng định dạng ví dụ : nguyenvana@gmail.com!'},
      {type: 'maxlength', message: 'Tối đa 40 kí tự!'}
    ],
    phoneCustomer: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại!'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập số địa thoại đúng định dạng 09xxxxxxxx hoặc 08xxxxxxxx hoặc 07xxxxxxxx hoặc 03xxxxxxxx'
      }
    ],
    idCardCustomer: [
      {type: 'required', message: 'Vui lòng nhập CMND!'},
      {type: 'pattern', message: 'CMND phải đúng định dạng 10 số hoặc 12 số!'},
    ],
    countries: [
      {type: 'required', message: ' Vui lòng chọn quốc tịch!'},
    ],

    birthdayCustomer: [
      {type: 'dateValid', message: 'Vui lòng chọn ngày sinh bé hơn ngày hiện tại!'},
      {type: 'checkAge', message: 'Vui lòng chọn ngày sinh 6 tháng tuổi trở lên và bé hơn 100 tuổi!'},
    ],
    address: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ!'},
      {type: 'minlength', message: 'Vui lòng trên 5 kí tự!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 40 kí tự!'},
    ],
  }

  customer = new FormGroup({
    nameCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/), Validators.maxLength(40)]),
    genderCustomer: new FormControl('', [Validators.required]),
    birthdayCustomer: new FormControl('', [Validators.required, DateValidator]),
    idCardCustomer: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{10})$|([0-9]{12})$/)]),
    phoneCustomer: new FormControl('', [Validators.required, Validators.pattern(/^((03)|(08)|(07)|(09))([0-9]){8}$/)]),
    emailCustomer: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    addressCustomer: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    delFlagCustomer: new FormControl(''),
    countries: new FormControl('', Validators.required),
    customerType: new FormControl('', Validators.required)
  });

  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.customerService.getAllCustomerType().subscribe(data => {
        this.customerType = data;
      }
    );
    this.customerService.getAllCountries().subscribe(data => {
        this.country = data;
      }
    );
  }

  save() {
    if (this.customer.valid) {
      let trimName = this.customer.get('nameCustomer').value.trim();
      let trimAddress = this.customer.get('addressCustomer').value.trim();
      let trimEmail = this.customer.get('emailCustomer').value.trim();
      this.customer.get("nameCustomer").setValue(trimName);
      this.customer.get("addressCustomer").setValue(trimAddress);
      this.customer.get("emailCustomer").setValue(trimEmail);
      this.customerService.save(this.customer.value).subscribe(
        (next) => {
          console.log(next)
          this.snackBar.open('Thêm mới thành công khách hàng có tên là ' + this.customer.get('nameCustomer').value + ("."), 'OK', {duration: 2000});
          this.customer.reset()
        }, error => {
          this.snackBar.open('Thêm mới không thành công', 'OK', {duration: 2000});
          this.idCard = error.error.idCardCustomer
          this.phone = error.error.phoneCustomer
          this.emailValid = error.error.emailCustomer
        }
      );
    }
  }

  isEmpty() {
    this.idCard = ''
    this.phone = ''
    this.emailValid = ''
  }

}

export function DateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (new Date(control.value) > new Date()) {
    console.log(new Date(control.value))
    console.log(new Date())
    return {
      dateValid: true
    };
  }
  const dateOfBirth = new Date(control.value);
  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 0.5 || new Date().getFullYear() - dateOfBirth.getFullYear() > 100) {
    return {
      checkAge: true
    };
  }
  return null;
}


