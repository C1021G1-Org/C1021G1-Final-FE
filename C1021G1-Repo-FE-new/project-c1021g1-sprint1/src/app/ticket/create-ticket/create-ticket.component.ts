import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {trigger, state, style, transition, animate, keyframes} from "@angular/animations";
import {Ticket} from "../model/ticketModel";
import {FlightModel} from "../model/flightModel";
import {RoleEmailTicket} from "../model/roleEmailTicket";
import {SenEmailTicket} from "../model/senEmailTicket";


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],

})
export class CreateTicketComponent implements OnInit {
  ticketList1: Ticket[] = [];
  ticketList2: Ticket[] = [];
  ticketPrice1: number = 0
  ticketPrice2: number = 0
  indexForm: number = 0
  indexForm2: number = 0
  flightTicket1: FlightModel;
  flightTicket2: FlightModel;
  child: boolean;
  child2: boolean;
  ageEro2: number;
  ageEro: number;
  orderFrom: FormGroup
  myForm: FormArray;
  checkInvalid: boolean = false;
  checkInvalid2: boolean = false;
  // orderForm2: FormGroup
  myForm2: FormArray;
  sumPrice1: number = 0
  sumPrice2: number = 0
  copy: number;

  roleEmail: RoleEmailTicket

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar,
              private router: Router,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.roleEmail = {role: sessionStorage.getItem('roles'), email: sessionStorage.getItem('email')}
    this.ticketList1 = this.ticketService.listIdTicket1;
    console.log(this.ticketList1)
    console.log("1111111111")
    this.ticketList2 = this.ticketService.listIdTicket2;
    console.log(this.ticketList2)
    console.log("222222")

    this.ticketPrice1 = this.ticketService.priceTicket1;
    console.log(this.ticketPrice1)
    console.log("ppppppp11")

    this.ticketPrice2 = this.ticketService.priceTicket2;
    console.log(this.ticketPrice2)
    console.log("ppppppp22222")


    this.flightTicket1 = this.ticketService.flight1;
    console.log(this.flightTicket1)
    console.log("pppppplllllll11111")

    this.flightTicket2 = this.ticketService.flight2;
    console.log("pppppplllllll2222222")

    this.orderFrom = new FormGroup({
      myForm: new FormArray([]),
      myForm2: new FormArray([])
    })


    this.setFormArray()
    this.updateValue()
    if (this.ticketList2.length > 0) {
      this.setFormArray2()
      this.updateValue2()
    }

  }

  updateValue() {

    this.ticketService.getIdForCreateTicket(this.roleEmail).subscribe((data) => {
      console.log(this.ticketList1)
      console.log(data);
      console.log("ffffffffffffffffffffffffffffffffffffffffffffff")

      for (let i = 0; i < this.ticketList1.length; i++) {
        this.myForm.at(i).patchValue({id: this.ticketList1[i].id})
        console.log(this.myForm.value)
        console.log("111111111q")
        if (this.roleEmail.role.includes("EMPLOYEE")) {

          this.myForm.at(i).patchValue({employee: data})
          console.log(this.myForm.value)
          console.log("111111111qf")
        } else if (!this.roleEmail.role.includes("EMPLOYEE")) {
          this.myForm.at(i).patchValue({customer: data})
          console.log(this.myForm)
          console.log("111111111qdddd")
        }

        console.log(this.myForm.value)
      }

    }, error => {
      console.log(error)
      console.log("có lỗi ròi ")
    })
    console.log(this.myForm.value)
  }

  updateValue2() {
    this.ticketService.getIdForCreateTicket(this.roleEmail).subscribe((data) => {
      console.log(this.ticketList2)
      for (let i = 0; i < this.ticketList1.length; i++) {
        this.myForm2.at(i).patchValue({id: this.ticketList2[i].id})
        console.log(this.myForm2.value)
        console.log("111111111q")
        if (this.roleEmail.role.includes("EMPLOYEE")) {
          this.myForm2.at(i).patchValue({employee: data})
          console.log(this.myForm2.value)
          console.log("111111111qf")
        } else if (!this.roleEmail.role.includes("EMPLOYEE")) {
          this.myForm2.at(i).patchValue({customer: data})
          console.log(this.myForm2)
          console.log("111111111qdddd")
        }

        console.log(this.myForm2.value)
      }

    }, error => {
      console.log(error)
      console.log("có lỗi ròi ")
    })

    console.log(this.myForm2.value)
  }


  setFormArray() {
    for (let i = 0; i < this.ticketList1.length; i++) {
      this.myForm = this.orderFrom.get('myForm') as FormArray
      this.myForm.push(
        this.fb.group({
          id: new FormControl(''),
          emailTicket: new FormControl('', [Validators.required, Validators.email]),
          //
          phoneTicket: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
          //
          genderTicket: new FormControl('', [Validators.required]),
          //
          priceTicket: new FormControl('', [Validators.required]),
          //
          buyerTicket: new FormControl('', [Validators.required, Validators.minLength(3)]),
          //
          birthdayTicket: new FormControl('', [Validators.required]),
          dateTicket: new FormControl(''),
          //
          idCard: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
          //
          employee: new FormControl(''),
          customer: new FormControl(''),
        })
      )
    }
  }

  setFormArray2() {
    for (let i = 0; i < this.ticketList2.length; i++) {
      this.myForm2 = this.orderFrom.get('myForm2') as FormArray
      this.myForm2.push(
        this.fb.group({
          id: new FormControl(''),
          emailTicket: new FormControl('', [Validators.required, Validators.email]),
          //
          phoneTicket: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
          //
          genderTicket: new FormControl('', [Validators.required]),
          //
          priceTicket: new FormControl('', [Validators.required]),
          //
          buyerTicket: new FormControl('', [Validators.required, Validators.minLength(3)]),
          //
          birthdayTicket: new FormControl('', [Validators.required]),
          dateTicket: new FormControl(''),
          //
          idCard: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
          //
          employee: new FormControl(''),
          customer: new FormControl(''),
        })
      )
    }
  }


  inputValue(i: number) {
    this.checkInvalid = false;
    if (!this.myForm.at(i).invalid) {
      if (this.indexForm == i) {

        let dayTicket = new Date();
        let year = dayTicket.getFullYear().toString();
        let month = dayTicket.getMonth().toString();
        let day = dayTicket.getDay().toString();
        if (day == '0') {
          day = '1'
        }
        let datetime = year + "-" + month + "-" + day
        this.myForm.at(i).get('dateTicket').patchValue(datetime);
        if (this.ageEro < 18) {
          this.myForm.at(i).get('idCard').patchValue(null)

        }


        this.indexForm = this.indexForm + 1
        if (this.indexForm >= this.myForm.controls.length) {
          this.indexForm = this.myForm.controls.length - 1
        }
        if (this.indexForm == this.myForm.controls.length - 1) {
          this.sumPrice1 = 0
          for (let i = 0; i < this.myForm.length; i++) {
            this.sumPrice1 += (Number(this.myForm.at(i).get('priceTicket').value) + Number(this.ticketPrice1))
          }
          console.log(this.sumPrice1)
        }
        console.log(this.myForm2)
        console.log(this.myForm)
        this.child = false

      }
      if (this.indexForm == this.ticketList1.length - 1) {
        this.snackBar.open('bạn đã đăng ký thành công vé cho chuyến đi', 'OK', {

          duration: 3000,

        })
      }

    } else {
      if (this.indexForm == i) {
        this.checkInvalid = true
      }
    }
    console.log(this.myForm)
    console.log(this.myForm2)

  }

  inputValue2(i: number) {
    this.checkInvalid2 = false;
    if (!this.myForm2.at(i).invalid) {

      if (this.indexForm2 == i) {
        let dayTicket = new Date();
        let year = dayTicket.getFullYear().toString();
        let month = dayTicket.getMonth().toString();
        let day = dayTicket.getDay().toString();
        if (day == '0') {
          day = '1'
        }
        let datetime = year + "-" + month + "-" + day
        this.myForm2.at(i).get('dateTicket').patchValue(datetime);
        if (this.ageEro2 < 18) {
          this.myForm2.at(i).get('idCard').patchValue(null)

        }
        this.indexForm2 = this.indexForm2 + 1
        if (this.indexForm2 >= this.myForm2.controls.length) {
          this.indexForm2 = this.myForm2.length - 1
        }
        if (this.indexForm2 == this.myForm2.controls.length - 1) {
          this.sumPrice2 = 0
          for (let i = 0; i < this.myForm2.length; i++) {
            this.sumPrice2 += (Number(this.myForm2.at(i).get('priceTicket').value) + Number(this.ticketPrice2))
          }
          console.log(this.sumPrice2)
        }
        console.log(this.myForm2)
        console.log(this.myForm)
        this.child2 = false
      }

      if (this.indexForm2 == this.ticketList2.length-1) {
        this.snackBar.open('bạn đã đăng ký thành công vé cho chuyến khứ hồi ', 'OK', {

          duration: 3000,

        })
      }
    } else {
      if (this.indexForm2 == i) {
        this.checkInvalid2 = true
      }
    }

    console.log(this.myForm)
    console.log(this.myForm2)
  }
  checkValue(e, i: number) {

    if (this.indexForm == i) {
      this.child = false;
      this.child = e.target.checked
    }
  }

  checkValue2(e, m: number) {

    if (this.indexForm2 == m) {
      this.child2 = false;

      this.child2 = e.target.checked
    }
  }

  checkAge(i: number) {

    const birth = new Date(this.myForm.at(i).get('birthdayTicket').value)
    const birthDay = Date.now() - birth.getTime() - 86400000;
    const time = new Date(birthDay);
    const age = time.getUTCFullYear() - 1970;
    console.log(age)
    this.ageEro = age
  }

  checkAge2(m: number) {

    const birth = new Date(this.myForm2.at(m).get('birthdayTicket').value)
    const birthDay = Date.now() - birth.getTime() - 86400000;
    const time = new Date(birthDay);
    const age = time.getUTCFullYear() - 1970;
    console.log(age)
    this.ageEro2 = age
  }

  sendValue() {
    let check1: boolean
    let check2: boolean

    if (this.myForm2 == null) {
      check2 = false;
    }

    if (!this.myForm.invalid) {

      for (let i = 0; i < this.myForm.controls.length; i++) {
        this.myForm.at(i).patchValue({priceTicket: (this.myForm.at(i).get('priceTicket').value + this.ticketPrice1)})
        console.log(this.myForm.at(i).value)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        this.ticketService.updateTicketFirst(this.flightTicket1.id, this.ticketList1[0].seat.seatType.nameSeatType.toString(), this.myForm.at(i).value).subscribe(
          () => {
            check1 = false
          }, (data) => {
            console.log("đang gặp lỗi khi send dữ liệu")
            console.log(data)
            check1 = true;
            this.snackBar.open('đang có lỗi xảy ra', 'OK', {

              duration: 3000,

            })
          }, () => {

          })
      }
    }

    if (this.myForm2 != null) {
      if (!this.myForm2.invalid && this.myForm2.length > 0) {

        for (let i = 0; i < this.myForm2.controls.length; i++) {
          this.myForm2.at(i).patchValue({priceTicket: (this.myForm2.at(i).get('priceTicket').value + this.ticketPrice2)})
          console.log(this.myForm2.value)
          this.ticketService.updateTicketFirst(this.flightTicket2.id, this.ticketList2[0].seat.seatType.nameSeatType.toString(), this.myForm2.at(i).value).subscribe(
            () => {
              check2 = false
            }, (data) => {
              console.log("đang gặp lỗi 2 khi send dữ liệu ")
              console.log(data)
              check2 = true;
              this.snackBar.open('đang có lỗi xảy ra', 'OK', {

                duration: 3000,

              })
            }, () => {

            })


        }
      }
    }

    if (!check2 && !check1) {
      this.snackBar.open('bạn đã đặt vé thành công', 'OK',
        {duration: 3000,})
      const senEmail: SenEmailTicket = {
        sumPrice: this.sumPrice1 + this.sumPrice2,
        emailBuyer: "nguyenthanhtam1891997@gmail.com",
        numTicket: this.ticketList1.length + this.ticketList2.length
      }

      this.ticketService.sendEmail(senEmail).subscribe(data => {
        this.router.navigateByUrl("/ticket/paymentTicket")

      }, error => {
        console.log("bi loi roi")
      })


    }


  }


  previousForm2() {
    this.indexForm2 = this.indexForm2 - 1
    if (this.indexForm2 < 0) {
      this.indexForm2 = 0
    }
  }

  previousForm1() {
    this.indexForm = this.indexForm - 1
    if (this.indexForm < 0) {
      this.indexForm = 0
    }
  }
}








// import {Component, OnInit} from '@angular/core';
// import {TicketService} from "../ticket.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {Router} from "@angular/router";
// import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
//
// import {trigger, state, style, transition, animate, keyframes} from "@angular/animations";
// import {Ticket} from "../model/ticketModel";
// import {FlightModel} from "../model/flightModel";
// import {RoleEmailTicket} from "../model/roleEmailTicket";
// import {SenEmailTicket} from "../model/senEmailTicket";
//
//
// @Component({
//   selector: 'app-create-ticket',
//   templateUrl: './create-ticket.component.html',
//   styleUrls: ['./create-ticket.component.css'],
//
// })
// export class CreateTicketComponent implements OnInit {
//   ticketList1: Ticket[] = [];
//   ticketList2: Ticket[] = [];
//   ticketPrice1: number = 0
//   ticketPrice2: number = 0
//   indexForm: number = 0
//   indexForm2: number = 0
//   flightTicket1: FlightModel;
//   flightTicket2: FlightModel;
//   child: boolean;
//   child2: boolean;
//   ageEro2: number;
//   ageEro: number;
//   orderFrom: FormGroup
//   myForm: FormArray;
//   checkInvalid: boolean = false;
//   checkInvalid2: boolean = false;
//   // orderForm2: FormGroup
//   myForm2: FormArray;
//   sumPrice1: number = 0
//   sumPrice2: number = 0
//   copy: number;
//
//   roleEmail: RoleEmailTicket
//
//   constructor(private ticketService: TicketService,
//               private snackBar: MatSnackBar,
//               private router: Router,
//               private fb: FormBuilder) {
//   }
//
//
//   ngOnInit(): void {
//     this.roleEmail = {role: sessionStorage.getItem('roles'), email: sessionStorage.getItem('email')}
//     this.ticketList1 = this.ticketService.listIdTicket1;
//     console.log(this.ticketList1)
//     console.log("1111111111")
//     this.ticketList2 = this.ticketService.listIdTicket2;
//     console.log(this.ticketList2)
//     console.log("222222")
//
//     this.ticketPrice1 = this.ticketService.priceTicket1;
//     console.log(this.ticketPrice1)
//     console.log("ppppppp11")
//
//     this.ticketPrice2 = this.ticketService.priceTicket2;
//     console.log(this.ticketPrice2)
//     console.log("ppppppp22222")
//
//
//     this.flightTicket1 = this.ticketService.flight1;
//     console.log(this.flightTicket1)
//     console.log("pppppplllllll11111")
//
//     this.flightTicket2 = this.ticketService.flight2;
//     console.log("pppppplllllll2222222")
//
//     this.orderFrom = new FormGroup({
//       myForm: new FormArray([]),
//       myForm2: new FormArray([])
//     })
//
//
//     this.setFormArray()
//     this.updateValue()
//     if (this.ticketList2.length > 0) {
//       this.setFormArray2()
//       this.updateValue2()
//     }
//
//   }
//
//   updateValue() {
//
//     this.ticketService.getIdForCreateTicket(this.roleEmail).subscribe((data) => {
//       console.log(this.ticketList1)
//       for (let i = 0; i < this.ticketList1.length; i++) {
//         this.myForm.at(i).patchValue({id: this.ticketList1[i].id})
//         console.log(this.myForm.value)
//         console.log("111111111q")
//         if (this.roleEmail.role == "ROLE_EMPLOYEE") {
//           this.myForm.at(i).patchValue({employee: data})
//           console.log(this.myForm.value)
//           console.log("111111111qf")
//         } else if (this.roleEmail.role == "ROLE_CUSTOMER") {
//           this.myForm.at(i).patchValue({customer: data})
//           console.log(this.myForm)
//           console.log("111111111qdddd")
//         }
//
//         console.log(this.myForm.value)
//       }
//
//     }, error => {
//       console.log(error)
//       console.log("có lỗi ròi ")
//     })
//     console.log(this.myForm.value)
//   }
//
//   updateValue2() {
//     this.ticketService.getIdForCreateTicket(this.roleEmail).subscribe((data) => {
//       console.log(this.ticketList2)
//       for (let i = 0; i < this.ticketList1.length; i++) {
//         this.myForm2.at(i).patchValue({id: this.ticketList2[i].id})
//         console.log(this.myForm2.value)
//         console.log("111111111q")
//         if (this.roleEmail.role == "ROLE_EMPLOYEE") {
//           this.myForm2.at(i).patchValue({employee: data})
//           console.log(this.myForm2.value)
//           console.log("111111111qf")
//         } else if (this.roleEmail.role == "ROLE_CUSTOMER") {
//           this.myForm2.at(i).patchValue({customer: data})
//           console.log(this.myForm2)
//           console.log("111111111qdddd")
//         }
//
//         console.log(this.myForm2.value)
//       }
//
//     }, error => {
//       console.log(error)
//       console.log("có lỗi ròi ")
//     })
//
//     console.log(this.myForm2.value)
//   }
//
//   setFormArray() {
//     for (let i = 0; i < this.ticketList1.length; i++) {
//       this.myForm = this.orderFrom.get('myForm') as FormArray
//       this.myForm.push(
//         this.fb.group({
//           id: new FormControl(''),
//           emailTicket: new FormControl('', [Validators.required, Validators.email]),
//           //
//           phoneTicket: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
//           //
//           genderTicket: new FormControl('', [Validators.required]),
//           //
//           priceTicket: new FormControl('', [Validators.required]),
//           //
//           buyerTicket: new FormControl('', [Validators.required, Validators.minLength(3)]),
//           //
//           birthdayTicket: new FormControl('', [Validators.required]),
//           dateTicket: new FormControl(''),
//           //
//           idCard: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
//           //
//           employee: new FormControl(''),
//           customer: new FormControl(''),
//         })
//       )
//     }
//   }
//
//   setFormArray2() {
//     for (let i = 0; i < this.ticketList2.length; i++) {
//       this.myForm2 = this.orderFrom.get('myForm2') as FormArray
//       this.myForm2.push(
//         this.fb.group({
//           id: new FormControl(''),
//           emailTicket: new FormControl('', [Validators.required, Validators.email]),
//           //
//           phoneTicket: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
//           //
//           genderTicket: new FormControl('', [Validators.required]),
//           //
//           priceTicket: new FormControl('', [Validators.required]),
//           //
//           buyerTicket: new FormControl('', [Validators.required, Validators.minLength(3)]),
//           //
//           birthdayTicket: new FormControl('', [Validators.required]),
//           dateTicket: new FormControl(''),
//           //
//           idCard: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
//           //
//           employee: new FormControl(''),
//           customer: new FormControl(''),
//         })
//       )
//     }
//   }
//
//
//   inputValue(i: number) {
//     this.checkInvalid = false;
//     if (!this.myForm.at(i).invalid) {
//       if (this.indexForm == i) {
//
//         let dayTicket = new Date();
//         let year = dayTicket.getFullYear().toString();
//         let month = dayTicket.getMonth().toString();
//         let day = dayTicket.getDay().toString();
//         if (day == '0') {
//           day = '1'
//         }
//         let datetime = year + "-" + month + "-" + day
//         this.myForm.at(i).get('dateTicket').patchValue(datetime);
//         if (this.ageEro < 18) {
//           this.myForm.at(i).get('idCard').patchValue(null)
//
//         }
//
//
//         this.indexForm = this.indexForm + 1
//         if (this.indexForm >= this.myForm.controls.length) {
//           this.indexForm = this.myForm.controls.length - 1
//         }
//         if (this.indexForm == this.myForm.controls.length - 1) {
//           this.sumPrice1 = 0
//           for (let i = 0; i < this.myForm.length; i++) {
//             this.sumPrice1 += (Number(this.myForm.at(i).get('priceTicket').value) + Number(this.ticketPrice1))
//           }
//           console.log(this.sumPrice1)
//         }
//         console.log(this.myForm2)
//         console.log(this.myForm)
//         this.child = false
//
//       }
//       if (this.indexForm == this.ticketList1.length - 1) {
//         this.snackBar.open('bạn đã đăng ký thành công vé cho chuyến đi', 'OK', {
//
//           duration: 3000,
//
//         })
//       }
//
//     } else {
//       if (this.indexForm == i) {
//         this.checkInvalid = true
//       }
//     }
//     console.log(this.myForm)
//     console.log(this.myForm2)
//
//   }
//
//   inputValue2(i: number) {
//     this.checkInvalid2 = false;
//     if (!this.myForm2.at(i).invalid) {
//
//       if (this.indexForm2 == i) {
//         let dayTicket = new Date();
//         let year = dayTicket.getFullYear().toString();
//         let month = dayTicket.getMonth().toString();
//         let day = dayTicket.getDay().toString();
//         if (day == '0') {
//           day = '1'
//         }
//         let datetime = year + "-" + month + "-" + day
//         this.myForm2.at(i).get('dateTicket').patchValue(datetime);
//         if (this.ageEro2 < 18) {
//           this.myForm2.at(i).get('idCard').patchValue(null)
//
//         }
//         this.indexForm2 = this.indexForm2 + 1
//         if (this.indexForm2 >= this.myForm2.controls.length) {
//           this.indexForm2 = this.myForm2.length - 1
//         }
//         if (this.indexForm2 == this.myForm2.controls.length - 1) {
//           this.sumPrice2 = 0
//           for (let i = 0; i < this.myForm2.length; i++) {
//             this.sumPrice2 += (Number(this.myForm2.at(i).get('priceTicket').value) + Number(this.ticketPrice2))
//           }
//           console.log(this.sumPrice2)
//         }
//         console.log(this.myForm2)
//         console.log(this.myForm)
//         this.child2 = false
//       }
//
//       if (this.indexForm2 == this.ticketList2.length) {
//         this.snackBar.open('bạn đã đăng ký thành công vé cho chuyến khứ hồi ', 'OK', {
//
//           duration: 3000,
//
//         })
//       }
//     } else {
//       if (this.indexForm2 == i) {
//         this.checkInvalid2 = true
//       }
//     }
//
//     console.log(this.myForm)
//     console.log(this.myForm2)
//   }
//
//
//   checkValue(e, i: number) {
//
//     if (this.indexForm == i) {
//       this.child = false;
//       this.child = e.target.checked
//     }
//   }
//
//   checkValue2(e, m: number) {
//
//     if (this.indexForm2 == m) {
//       this.child2 = false;
//
//       this.child2 = e.target.checked
//     }
//   }
//
//   checkAge(i: number) {
//
//     const birth = new Date(this.myForm.at(i).get('birthdayTicket').value)
//     const birthDay = Date.now() - birth.getTime() - 86400000;
//     const time = new Date(birthDay);
//     const age = time.getUTCFullYear() - 1970;
//     console.log(age)
//     this.ageEro = age
//   }
//
//   checkAge2(m: number) {
//
//     const birth = new Date(this.myForm2.at(m).get('birthdayTicket').value)
//     const birthDay = Date.now() - birth.getTime() - 86400000;
//     const time = new Date(birthDay);
//     const age = time.getUTCFullYear() - 1970;
//     console.log(age)
//     this.ageEro2 = age
//   }
//
//   sendValue() {
//     let check1: boolean
//     let check2: boolean
//
//     if (this.myForm2 == null) {
//       check2 = false;
//     }
//
//     if (!this.myForm.invalid) {
//
//       for (let i = 0; i < this.myForm.controls.length; i++) {
//         this.myForm.at(i).patchValue({priceTicket: (this.myForm.at(i).get('priceTicket').value + this.ticketPrice1)})
//         console.log(this.myForm.at(i).value)
//         this.ticketService.updateTicketFirst(this.flightTicket1.id, this.ticketList1[0].seat.seatType.nameSeatType.toString(), this.myForm.at(i).value).subscribe(
//           () => {
//             check1 = false
//           }, (data) => {
//             console.log("đang gặp lỗi khi send dữ liệu")
//             console.log(data)
//             check1 = true;
//             this.snackBar.open('đang có lỗi xảy ra', 'OK', {
//
//               duration: 3000,
//
//             })
//           }, () => {
//
//           })
//       }
//     }
//
//     if (this.myForm2 != null) {
//       if (!this.myForm2.invalid && this.myForm2.length > 0) {
//
//         for (let i = 0; i < this.myForm2.controls.length; i++) {
//           this.myForm2.at(i).patchValue({priceTicket: (this.myForm2.at(i).get('priceTicket').value + this.ticketPrice2)})
//           console.log(this.myForm2.value)
//           this.ticketService.updateTicketFirst(this.flightTicket2.id, this.ticketList2[0].seat.seatType.nameSeatType.toString(), this.myForm2.at(i).value).subscribe(
//             () => {
//               check2 = false
//             }, (data) => {
//               console.log("đang gặp lỗi 2 khi send dữ liệu ")
//               console.log(data)
//               check2 = true;
//               this.snackBar.open('đang có lỗi xảy ra', 'OK', {
//
//                 duration: 3000,
//
//               })
//             }, () => {
//
//             })
//
//
//         }
//       }
//     }
//
//     if (!check2 && !check1) {
//       this.snackBar.open('bạn đã đặt vé thành công', 'OK',
//         {duration: 3000,})
//       const senEmail: SenEmailTicket = {
//         sumPrice: this.sumPrice1 + this.sumPrice2,
//         emailBuyer: "nguyenthanhtam1891997@gmail.com",
//         numTicket: this.ticketList1.length + this.ticketList2.length
//       }
//
//       this.ticketService.sendEmail(senEmail).subscribe(data => {
//
//       }, error => {
//         console.log("bi loi roi")
//       })
//
//
//       this.router.navigateByUrl("/ticket/paymentTicket")
//     }
//
//
//   }
//
//
//   previousForm2() {
//     this.indexForm2 = this.indexForm2 - 1
//     if (this.indexForm2 < 0) {
//       this.indexForm2 = 0
//     }
//   }
//
//   previousForm1() {
//     this.indexForm = this.indexForm - 1
//     if (this.indexForm < 0) {
//       this.indexForm = 0
//     }
//   }
// }
