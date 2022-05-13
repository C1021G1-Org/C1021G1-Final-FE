import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Ticket} from "../model/ticket";
import {MatDialog} from "@angular/material/dialog";
import {AbortTicketComponent} from "../abort-ticket/abort-ticket.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

declare var paypal: any;


@Component({
  selector: 'app-payment-ticket',
  templateUrl: './payment-ticket.component.html',
  styleUrls: ['./payment-ticket.component.css']
})
export class PaymentTicketComponent implements OnInit {
  ticketList: Ticket[];

  indexPagination: number = 0;
  totalPagination: number;

  // SonNH Trạng thái button paypal
  isPaypalLoad: Boolean = false;

  // SonNH list mã ticket cần thanh toán
  listTicketToPay: any[] = [];

  //SonNH mã ticket thêm vào list ticket cần thanh toán
  codeTicketToAdd: string;


  totalPrice: number;
  finalPrice: number;

  ticket: Ticket;
  checkSizeList: Boolean = false;
  totalPaginationRecord: number;
  priceForEachTicket: number;

  checkSideBar: Boolean = true; // Customer



  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,) {
  }


  ngOnInit(): void {

    // /** spinner starts on init */
    // this.spinner.show();
    //
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);

    this.checkSideBar = sessionStorage.getItem("roles").includes("EMPLOYEE") ? false : true;

    this.getALlTicketByCustomerId();
    console.log("1111111")
  }

  getALlTicketByCustomerId() {
    // alert("asd")
    console.log("asd")
    this.ticketService.getAllTicketByCustomerEmail(0).subscribe(value => {
      this.ticketList = value.content;
      // console.log(value);
      // console.log("chưa thanh toán" + this.ticketList[1].customer.nameCustomer)
      if (this.ticketList.length == 0) {
        this.checkSizeList = true;
      } else {
        this.checkSizeList = false;
      }
      this.totalPagination = value['totalPages'];
      this.totalPaginationRecord = value['totalElements'];
      if ((this.ticketList.length / 10) != 0) {
        this.totalPagination = (Math.round((this.ticketList.length / 10) + 1))
      }
      console.log(this.totalPagination)

    }, error => {
      this.checkSizeList = true;
      console.log("Không tìm thấy trang")
    })
  }

  //Hiển thị dialog hủy thanh toán
  abortTicket(codeTicket: string) {
    const dialog = this.dialog.open(AbortTicketComponent, {
      width: "700px",
      data: codeTicket
    })
    dialog.afterClosed().subscribe(value => {

      this.ngOnInit();

    })
  }

  codeTicketTopay: string;


  //SonNH gọi dịch vụ thanh toán
  private totalpr: any;
  private pric: any;


  callPaypal() {
    console.log(this.listTicketToPay)
    this.getTotalPrice();
    if (this.isPaypalLoad == false) {
      this.isPaypalLoad = true;
      let t = this;
      paypal.Button.render({
        // Configure environment
        env: 'sandbox',
        client: {
          sandbox: 'demo_sandbox_client_id',
          production: 'demo_production_client_id'
        },
        // Customize button (optional)
        locale: 'en_US',
        style: {
          size: 'small',
          color: 'gold',
          shape: 'rect',
        },
        commit: true,
        // SonNH Set up a payment
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [{
              amount: {
                total: t.finalPrice,
                currency: 'USD'
              }
            }]
          });
        },
        // Execute the payment

        onAuthorize: function (data, actions) {
          let t2 = t;
          return actions.payment.execute().then(function () {
            // Show a confirmation message to the buyer
            t.pay();
            t.snackBar.open("Thanh toán thành công!", "Xác nhận", {
              duration: 3000
            });
            t.sendEmailConfirmPayment();
            console.log('da ng on init')
          });

        }
      }, '#paypal-button')
    }
    // if (this.listTicketToPay[0] != null) {
    //
    //
    // }
    // else {
    //   this.snackBar.open("Chưa lựa chọn vé","Chọn vé",{
    //     duration: 3000
    //   })
    // }

  }

  //SonNh thêm ticket để thanh toán

  addTicketToPay(element, codeTicket: string) {
    console.log(element.checked)
    if (!this.listTicketToPay.includes(codeTicket) && element.checked) {
      console.log("Khi chọn ticket")
      console.log(codeTicket)
      this.codeTicketToAdd = codeTicket;
      this.listTicketToPay.push(this.codeTicketToAdd);
      console.log(this.listTicketToPay);
      this.codeTicketToAdd = null;
      console.log(this.codeTicketToAdd)
    } else {
      console.log("bỏ chọn")
      for (let i = 0; i < this.listTicketToPay.length; i++) {
        if (this.listTicketToPay[i] === codeTicket) {
          this.listTicketToPay.splice(i, 1);
        }
      }
    }
    console.log(this.listTicketToPay);
  }

  //SonNH lấy danh sách code cần thanh toán
  getListToPay() {
    for (let i = 0; this.listTicketToPay.length; i++) {
      this.ticketService.getTicketInfo(this.listTicketToPay[i]).subscribe(value => {
        this.ticket = value;
        this.totalPrice += this.ticket.priceTicket;
        this.ticket = null;
      })
    }
  }


  pay() {
    // SonNH gửi list mã vé cần thanh toán qua back end!
    for (let i = 0; i < this.listTicketToPay.length; i++) {
      this.codeTicketTopay = this.listTicketToPay[i]
      console.log("vé cần thanh toán" + this.codeTicketTopay)
      this.ticketService.payTickets(this.listTicketToPay).subscribe(value => {
        console.log("Thanh toán vé: " + this.listTicketToPay)
      })
    }
  }

  getTotalPrice() {
    // SonNH gửi list mã vé cần thanh toán qua back end và nhận về tổng giá vé cần thanh toán!
    for (let i = 0; i < this.listTicketToPay.length; i++) {
      this.codeTicketTopay = this.listTicketToPay[i]
      console.log("Vé cần thanh toán:" + this.codeTicketTopay)
      this.ticketService.getTotalPrice(this.listTicketToPay).subscribe(value => {
        this.finalPrice = value;
        console.log("Gửi list ticket qua back end")
      }, error => {
        console.log(error)
      }, () => {
        console.log("Tổng tiền từ back end gửi về:" + this.finalPrice)
      })
    }

  }

  sendEmailConfirmPayment() {
    const priceVND = Math.round(this.finalPrice * 23000)
    const quantity = this.listTicketToPay.length;
    let role = sessionStorage.getItem('roles');
    if (role.includes('EMPLOYEE')) {
      const nameCustomer = this.ticketList[0].employee.nameEmployee;
      this.ticketService.confirmEmailPayment(priceVND, nameCustomer, quantity).subscribe(value => {
        console.log("Gửi email");
        this.ngOnInit();

      })
    } else {
      const nameCustomer = this.ticketList[0].customer.nameCustomer;
      this.ticketService.confirmEmailPayment(priceVND, nameCustomer, quantity).subscribe(value => {

        console.log("Gửi email");
        this.ngOnInit();
        console.log('da onInit');
      })
    }


  }

//  SonNH phaan trang
  getTicketPage(pageNumber: number) {
    this.ticketService.getAllTicketByCustomerEmail(pageNumber).subscribe((data: any) => {
      console.log(this.ticketList)
      this.ticketList = data.content;
    });
  }

  firtPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      console.log(this.indexPagination)
      this.getTicketPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getTicketPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getTicketPage(this.indexPagination);
  }

  //  SonNH Sortinh
  key: string = "id";
  reverse: boolean = false;


  Sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
