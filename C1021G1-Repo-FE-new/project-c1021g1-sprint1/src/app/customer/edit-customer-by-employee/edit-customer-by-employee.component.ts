import {Component, Inject, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomerType} from "../model/ICustomerType";
import {ICountries} from "../model/ICountries";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import { IPersonalDto } from '../model/IPersonalDto';
import {ICustomer} from "../model/ICustomer";

//ThangDBX trang chỉnh sửa thông tin bản thân khách hàng
@Component({
  selector: 'app-edit-customer-by-employee',
  templateUrl: './edit-customer-by-employee.component.html',
  styleUrls: ['./edit-customer-by-employee.component.css']
})
export class EditCustomerByEmployeeComponent implements OnInit {
  idCard: string = null;

  phone: string = null;

  // loading khi cap nhat
  loading : boolean = false

  // customerType: ICustomerType[];
  country: ICountries[];
  customerForm: FormGroup;
  // bien lay url cua anh de cap nhat
  selectedImage : any = null;

  // bien lay anh de hien thi khi edit
  selectedImage1 : any = null;

  // biến để lưu trữ url ảnh trường hợp không cập nhật
  url: any = null;
  id : number;
  customer : IPersonalDto;
  routerLink : string = null;
  validation_messages = {
    nameCustomer: [
      {type: 'required', message: 'Vui lòng nhập họ và tên!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 30 kí tự!'},
      {type: 'minlength', message: 'Vui lòng nhập trên 10 kí tự!'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số!'}
    ],
    emailCustomer: [
      {type: 'required', message: '  Vui lòng nhập email!'},
      {type: 'email', message: '  Vui lòng nhập email đúng định dạng ví dụ : nguyenvana@gmail.com!'},
    ],
    phoneCustomer: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại!'},
      {type: 'pattern', message: 'Vui lòng nhập số địa thoại đúng định dạng 090xxxxxxx hoặc 091xxxxxxx'}
    ],
    idCardCustomer: [
      {type: 'required', message: 'Vui lòng nhập CMND!'},
      {type: 'pattern', message: 'CMND phải đúng định dạng 12 hoặc 10 số!'},

    ],
    countries: [
      {type: 'required', message: ' Vui lòng chọn quốc tịch!'},
    ],
    customerType: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
    ],
    birthdayCustomer: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
      {type: 'ageUnder', message: 'Bạn phải trên 18 tuổi và dưới 100 tuổi '},
    ],
    imageCustomer: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
    ],

  }
  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router, private active: ActivatedRoute, private formBuilder: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }
  ngOnInit(): void {
    // ThangDBX khoi tao form
    this.customerForm = new FormGroup({
      id: new FormControl(''),
      nameCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/), Validators.maxLength(30), Validators.minLength(10)]),
      genderCustomer: new FormControl('',),
      birthdayCustomer: new FormControl('', [Validators.required,this.checkAge]),
      idCardCustomer: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{10})$|([0-9]{12})$/)]),
      phoneCustomer: new FormControl('', [Validators.required, Validators.pattern(/^((03)|(08)|(07)|(09))([0-9]){8}$/)]),
      emailCustomer: new FormControl('', [Validators.required, Validators.email]),
      addressCustomer: new FormControl('', Validators.required),
      delFlagCustomer: new FormControl(''),
      imageCustomer: new FormControl(''),
      countries: new FormControl('',Validators.required),
    });
    // THangDBX lay gia tri customer theo Id
    // this.customerService.getAllCountries().subscribe((data : ICountries[])=> {
    //   this.country = data;
    //   this.customerService.findPersonalId(Number((this.active.snapshot.paramMap.get('id')))).subscribe(( data1: IPersonalDto) => {
    //     this.customerForm.patchValue(data1);
    //     this.id = data1.id;
    //     console.log(this.id + ' id is ::::')
    //     // this.selectedImage = data1.imageCustomer;
    //     this.url = data1.imageCustomer;
    //     this.selectedImage1 = data1.imageCustomer;
    //   });
    // });
    // this.routerLink = "/view-customer/" + this.id;
    // console.log(this.customerForm.value);

    //ThangDBX lay gia tri customer theo email trong token
    this.customerService.getAllCountries().subscribe((data : ICountries[])=> {
      this.country = data;
      this.customerService.findPersonalEmail().subscribe(( data1: IPersonalDto) => {
        console.log(data1)
        this.customerForm.patchValue(data1);
        this.id = data1.id;

        console.log(this.id + ' id is ::::')
        console.log(this.customerForm.value)
        console.log(data1)
        // console.log(data1.countries)

        // this.selectedImage = data1.imageCustomer;
        this.url = data1.imageCustomer;
        this.selectedImage1 = data1.imageCustomer;
      });
    });
    this.routerLink = "/view-customer" ;
    console.log(this.customerForm.value);

  }


  //ThangDBX check tuoi tren 18
  checkAge(birthdayCustomer: AbstractControl) {
    console.log(birthdayCustomer.value);
    const birth = new Date(birthdayCustomer.value);
    const birthday = Date.now() - birth.getTime() - 86400000;
    const time = new Date(birthday);
    console.log(time.getUTCFullYear());
    const age = time.getUTCFullYear() - 1970;
    console.log(age);
    if (age < 18 || age > 100) {
      return {'ageUnder': true};
    }
    return null;
  }


  showPreview(event: any) {
    // lấy image về
    this.selectedImage = event.target.files[0];

    // hiển thị image đã lấy lên trên trang edit
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.selectedImage1 = event.target.result;
      };
    }

  }
  update() {
    this.loading = true;
    this.customer = this.customerForm.value;

    // ThangDBX kiểm tra xem có update ảnh không ( ảnh k cần thiết phải có )
    if (this.selectedImage != null){
      // upload image to firebase

      console.log(this.customer.id + ' --- ' + this.customer.nameCustomer + '\n -------------------------------------------');
      const nameImg = EditCustomerByEmployeeComponent.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      //call api firebase

      console.log(this.storage
        .upload(nameImg, this.selectedImage)
        .snapshotChanges()
        .pipe().subscribe());

      this.storage
        .upload(nameImg, this.selectedImage)
        .snapshotChanges()
        .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // this.customerForm.get('imageCustomer').patchValue(url);
            this.customerForm.patchValue({imageCustomer: url});

            console.log(this.customerForm.value);
            // this.customerForm.patchValue({imageCustomer : url});
            this.selectedImage = url;
            console.log(url);
            // goi API update
            if (this.customerForm.valid) {
              this.customerService.updatePersonalInfo(this.id, this.customerForm.value).subscribe(data => {
                console.log(data);
                this.snackBar.open('Đã cập nhật thành công', 'OK');
                this.router.navigateByUrl('/view-customer');
              }, error => {
                console.log(error);
                this.idCard = error.error.idCardCustomer
                console.log( this.idCard)

                this.phone = error.error.phoneCustomer
                console.log( this.phone)
                const message = error.message;
                this.snackBar.open(message, 'OK');
              });
            }


          });
        })
      )
        .subscribe();
    } else {
      //ThangDBX update
      // goi API update
      if (this.customerForm.valid) {

        // lấy laaji url chưa cập nhật
        this.customerForm.patchValue({imageCustomer:this.url}) ;
        this.customerService.updatePersonalInfo(this.id, this.customerForm.value).subscribe(data => {
          this.snackBar.open('Đã cập nhật thành công', 'OK');
          this.router.navigateByUrl('/view-customer' );
        }, error => {
          this.idCard = error.error.idCardCustomer
          console.log( this.idCard)

          this.phone = error.error.phoneCustomer
          console.log( this.phone)
          console.log(error);
          this.snackBar.open(error.message, 'OK');
          console.log(this.id ,'------------------------');
          console.log(this.customerForm.value);
        });
      }
    }
  }


  static getCurrentDateTime() {
    return formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }

  back(){
    this.router.navigateByUrl('/view-customer');
  }

  inputImageFile() {
    document.getElementById('fileupload-image').click()
  }

}
