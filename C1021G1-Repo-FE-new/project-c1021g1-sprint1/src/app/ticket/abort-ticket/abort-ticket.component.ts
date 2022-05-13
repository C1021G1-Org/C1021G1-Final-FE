import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TicketService} from "../ticket.service";
import {Ticket} from "../model/ticket";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-abort-ticket',
  templateUrl: './abort-ticket.component.html',
  styleUrls: ['./abort-ticket.component.css']
})
export class AbortTicketComponent implements OnInit {
  ticket: Ticket;
  codeTicket: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogAbort: MatDialogRef<AbortTicketComponent>,
              private ticketService: TicketService,
              private snackBar:MatSnackBar) {
    this.codeTicket = this.data;
    console.log(this.data)

  }

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket() {
    this.ticketService.getTicketInfo(this.codeTicket).subscribe(value => {
      this.ticket = value;
      console.log("Lấy ticket thành công với mã vé là:" + this.codeTicket)
    })
  }

  abortTicket() {
    this.ticketService.abortTicket(this.codeTicket).subscribe(value => {
      this.ticket = value;
    }, error => {
      console.log(error)
    }, () => {
      this.dialogAbort.close();
      this.snackBar.open("Đã hủy vé thành công", "Xác nhận",{
        duration: 3000
      })
      console.log("Đã hủy vé")
    })
  }
}
