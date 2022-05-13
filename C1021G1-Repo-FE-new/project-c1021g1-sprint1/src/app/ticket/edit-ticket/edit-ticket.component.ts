import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITicket} from "../model/ticket/i-ticket";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  id;
  ticket: ITicket;
  day1: string;
  month1: string;
  year1: string;
  time1: string;
  datetime1: string;

  editTicketForm = new FormGroup( {
    id: new FormControl(),
    buyerTicket : new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,50}$")]),
    emailTicket: new FormControl('',[Validators.required, Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")]),
    codeTicket: new FormControl(""),
    phoneTicket: new FormControl(""),
    genderTicket: new FormControl(""),
    statusTicket  : new FormControl(""),
    priceTicket: new FormControl(""),
    delFlagTicket: new FormControl(""),
    pointTicket: new FormControl(""),
    birthdayTicket: new FormControl(""),
    idCard: new FormControl(""),
    seat: new FormControl(""),
    customer: new FormControl(""),
    employee: new FormControl(""),
    dateTicket: new FormControl()
  });



  constructor(private ticketService: TicketService,
              private router: Router,
              private activatedRouted: ActivatedRoute,
              private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(data => {
      this.id = data.get('id');
      this.ticketService.getTicketById(this.id).subscribe(data => {
        this.ticket = data

        this.year1 = (this.ticket.seat.flightSeat.dateStart).slice(0, 4);
        this.month1 = (this.ticket.seat.flightSeat.dateStart).slice(5, 7);
        this.day1 = (this.ticket.seat.flightSeat.dateStart).slice(8, 10);
        this.time1 = (this.ticket.seat.flightSeat.dateStart).slice(11, this.ticket.seat.flightSeat.dateStart.length);
        this.datetime1 = this.day1 + "-" + this.month1 + "-" + this.year1 + " " + this.time1;
        console.log(this.datetime1);
        this.editTicketForm.setValue(this.ticket);
        console.log(this.editTicketForm.value)
      })
    });
  }





  public getTicket() {
    this.ticketService.getTicketById(this.id).subscribe(value =>
      console.log(value)
    )
  };

  public editTicket() {
    let buyerTicket = this.editTicketForm.get('buyerTicket').value.trim();
    this.editTicketForm.get("buyerTicket").setValue(buyerTicket);

    let emailTicket = this.editTicketForm.get('emailTicket').value.trim();
    this.editTicketForm.get("emailTicket").setValue(emailTicket);
    console.log(buyerTicket)
    console.log(emailTicket)
    this.ticketService.editTicketById(this.id, this.editTicketForm.value).subscribe(value => {
      console.log(this.editTicketForm.value);
      console.log(this.datetime1)
    },() => {
      this.snackBar.open("Cập Nhật Thất Bại!", "OK", {
        duration: 2000
      })
    },() =>{
      this.router.navigateByUrl('/ticket/list');
    });
    this.snackBar.open("Cập Nhật Thành Công!", "OK", {
      duration: 2000
    })
  }
}
