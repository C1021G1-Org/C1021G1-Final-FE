import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../ticket.service";
import {Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-history-ticket',
  templateUrl: './list-history-ticket.component.html',
  styleUrls: ['./list-history-ticket.component.css']
})
export class ListHistoryTicketComponent implements OnInit {
  ticketHistoryList: Ticket[];
  indexPagination: number = 0;
  totalPagination: number;
  sortedData: Ticket[];
  checkSizeList: Boolean = false;
  checkNull: Boolean = false;
  fightFrom: string;
  fightTo: string;
  searchHistoryTicket: FormGroup;
  statusTicket: string

  checkSideBar: Boolean = true; // Customer

  totalPaginationRecord: number;

  constructor(private ticketService: TicketService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkSideBar = sessionStorage.getItem("roles").includes("EMPLOYEE") ? false : true;
    console.log("checkside bar"+this.checkSideBar)
    this.getHistoryTicketByCustomerId();

    this.searchHistoryTicket = this.formBuilder.group({
      dateStart: [''],
      buyer: [''],
    });

  }

  getHistoryTicketByCustomerId() {
    this.ticketService.getHistoryTicketByCustomerEmail(0).subscribe(value => {
      this.ticketHistoryList = value.content;
      this.totalPagination = value['totalPages'];
      this.totalPaginationRecord = value['totalElements'];
      console.log("lấy list ticket thành công")
      if (this.ticketHistoryList.length == 0) {
        this.checkSizeList = true;
      } else {
        this.checkSizeList = false;
      }
      if ((this.ticketHistoryList.length % 10) != 0) {
        this.totalPagination = (Math.floor((this.ticketHistoryList.length / 10) + 1))
      }
    },error => {
      this.checkSizeList = true;
    })
  }

  //Search history

  selectStatus(e) {
    this.statusTicket = e.target.value;
    console.log(this.statusTicket);
  }

  search(pageNumber: any) {
    if (pageNumber == '' || pageNumber == null) {
      pageNumber = 0
      this.indexPagination = 0;
    }
    this.ticketService.searchListHistoryTicketList(this.statusTicket, this.searchHistoryTicket.value.dateStart, this.searchHistoryTicket.value.buyer,
      pageNumber).subscribe((data: any) => {
        if (data == null) {
          this.snackBar.open('Đã tìm kiếm thất bại', 'error')
          this.checkSizeList = true;
        } else {
          this.checkSizeList = false;
          this.ticketHistoryList = data.content;
          this.totalPagination = data['totalPages'];
          this.totalPaginationRecord = data['totalElements'];
          this.snackBar.open('Đã tìm kiếm thành công', 'ok')
          this.checkNull = false;
        }

      }, error => {
        this.ticketHistoryList = [];
        this.checkNull = true;
        this.snackBar.open('Đã tìm kiếm thất bại', 'error')
      },() => {}
    );
  }


  checkFormNull() {
    if (this.searchHistoryTicket.get('statusTicket').value == ''
      && this.searchHistoryTicket.get('fromFlight').value == ''
      && this.searchHistoryTicket.get('buyer').value == '') {
      return true;
    } else {
      return false;
    }
  }

  //SonNH Phân trang
  getTicketPerPage(pageNumber: number) {

    // this.ticketService.getHistoryTicketByCustomerId(1, pageNumber).subscribe((data: any) => {
    this.ticketService.searchListHistoryTicketList(this.statusTicket, this.searchHistoryTicket.value.dateStart, this.searchHistoryTicket.value.buyer,
      pageNumber).subscribe((data: any) => {
      console.log(this.ticketHistoryList)
      console.log('no search')
      this.ticketHistoryList = data.content;
      this.totalPagination = data['totalPages']
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
      this.getTicketPerPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getTicketPerPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getTicketPerPage(this.indexPagination);
  }


}

