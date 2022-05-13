import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTicketComponent} from "../delete-ticket/delete-ticket.component";
import {TicketDTO} from "../model/TicketDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  indexPagination: number = 0;

  totalPagination: number;

  tickets: TicketDTO[] = [];

  listTicketNotPagination: TicketDTO[] = [];

  checkNullData: boolean = false;


  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  // checkForm = new FormGroup({
  //   code: new FormControl('',[Validators.minLength(0),Validators.maxLength(15)]),
  //   buyer: new FormControl('',[Validators.minLength(0),Validators.maxLength(15)]),
  //   fromFlight: new FormControl('',[Validators.minLength(0),Validators.maxLength(15)]),
  //   toFlight: new FormControl('',[Validators.minLength(0),Validators.maxLength(15)])
  // });

  ngOnInit(): void {
    this.ticketService.getAllTicket(0).subscribe(data => {
      this.tickets = data['content'];
      this.totalPagination = data['totalPages'] - 1;
    });
  }

  notPagination() {
    this.ticketService.getAllTicketNotPagination().subscribe(data => {
      this.listTicketNotPagination = data['content'];
      this.checkNullData = false;
      if ((this.listTicketNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listTicketNotPagination.length / 5)) + 1;
      }
    })
  }


  searchTicket(buyer: string, toFlight: string, fromFlight: string, code:string, page = 0) {
    this.ticketService.search(buyer, toFlight, fromFlight, code, page).subscribe(data => {
        this.tickets = data['content'];
        this.indexPagination = 0;
        this.totalPagination = data['totalPages'] - 1;
        this.checkNullData = false;
      },
      () => {
        this.notPagination();
        this.checkNullData = true;
        this.snackBar.open("Không tìm thấy!", 'Error', {
          duration: 2000
        })
      })
  }

  // <<
  firstPage(buyer: string, toFlight: string, fromFlight: string, code:string) {
    this.indexPagination = 0;
    this.ticketService.search(buyer, toFlight, fromFlight, code, this.indexPagination).subscribe(data => {
      this.tickets = data['content'];
    })
  }

  // >
  nextPage(buyer: string, toFlight: string, fromFlight: string, code:string) {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    } else {
      this.ticketService.search(buyer, toFlight, fromFlight, code, this.indexPagination).subscribe(data => {
        this.tickets = data['content'];
      })
    }
  }

  // <
  previousPage(buyer: string, toFlight: string, fromFlight: string, code:string) {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
    } else {
      this.ticketService.search(buyer, toFlight, fromFlight, code, this.indexPagination).subscribe(data => {
        this.tickets = data['content'];
      })
    }
  }

  // >>
  lastPage(buyer: string, toFlight: string, fromFlight: string, code:string) {
    this.indexPagination = this.totalPagination;
    this.ticketService.search(buyer, toFlight, fromFlight, code, this.totalPagination).subscribe(data => {
      this.tickets = data['content'];
    })
  }

  deleteTicket(id) {
    this.ticketService.getTicketByIdDto(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteTicketComponent, {
        width: '780px',
        height: '400px',
        data: {data1: data}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  };

}
