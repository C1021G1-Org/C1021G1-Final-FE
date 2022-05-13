import { Component, OnInit } from '@angular/core';
import {FlightService} from "../flight.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import * as moment from 'moment';
// import {DetailFlightComponent} from "../detail-flight/detail-flight.component";
import {MatDialog} from "@angular/material/dialog";
import {TicketService} from "../../ticket/ticket.service";


@Component({
  selector: 'app-list-search-flight',
  templateUrl: './list-search-flight.component.html',
  styleUrls: ['./list-search-flight.component.css']
})
export class ListSearchFlightComponent implements OnInit {
  minDate: any = "";
  isSearch: boolean =true;
  searchForm: FormGroup;
  check: Boolean = true;
  onewayList: any[]=[];
  twowayList: any[]=[];
  dateArr: any;
  endDate: any;
  startDate :any;
  dateDes: any;
  dateTime: any[] = [];
  indexPagination: number = 0;
  totalPagination: number;
  currentClick: string;
  checkDate: Boolean = true;


  constructor(private flightService: FlightService,
              public dialog: MatDialog,
              private  ticketService: TicketService) {
  }

  // ngOnInit(): void {
  //   this.getDate();
  //   this.searchForm = new FormGroup({
  //     fromFlight: new FormControl('', Validators.required),
  //     toFlight: new FormControl('', Validators.required),
  //     dateStart: new FormControl('', Validators.required),
  //     dateEnd: new FormControl('', Validators.required),
  //     searchOption: new FormControl('', Validators.required),
  //     sortOption: new FormControl('')
  //   });
  //   // this.flightService.getListAllFlight(0).subscribe(data => {
  //   //   this.flightService = data['content'];
  //   //   this.totalPagination = data['totalPages'] - 1;
  //   // });
  // }

  ngOnInit(): void {
    function compareDate(dateFlight: AbstractControl) {
      const checkeDate = dateFlight.value;
      if (checkeDate.dateEnd>=checkeDate.dateStart){
        return null;
      }
      console.log('dateNotSuccess')
      return {'dateNotSuccess': true};
    }
    this.getDate();
    this.searchForm = new FormGroup({
      fromFlight: new FormControl('', Validators.required),
      toFlight: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      searchOption: new FormControl('', Validators.required),
      sortOption: new FormControl('', Validators.required)
    },compareDate)
    // }, {
    //   validators: [creatDateRangeValidator()]
    // });
    // this.flightService.getListAllFlight(0).subscribe(data => {
    //   this.flightService = data['content'];
    //   this.totalPagination = data['totalPages'] - 1;
    // });
  }




  search() {
    this.isSearch = false
    console.log(this.searchForm.value);
    this.flightService.searchFlight(this.searchForm.value).subscribe(data => {
      this.setDateTimeArrival(this.searchForm.value.dateStart);
      this.dateDes = this.generateArrDate(this.searchForm.value.dateStart);
      this.dateArr = this.generateArrDate(this.searchForm.value.dateEnd);
      console.log(data);
      if (this.searchForm.get('searchOption').value == "oneway") {
        this.onewayList = data.oneway.content;
        this.check = true;
        this.checkDate = false;
      } else if (this.searchForm.get('searchOption').value == "twoway") {
        this.check = false;
        this.checkDate = false;
        this.onewayList = data.oneway.content;
        this.twowayList = data.twoway.content;
      }
    })
  }


  firstPage() {
    this.indexPagination = 0;
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination;
  }

  getFlightByDate(dateDes: any) {
    this.setCurrentDate(dateDes);
    this.checkDate = true;
    this.reset();
    this.flightService.listFlightByDate(dateDes).subscribe(data => {
      this.onewayList = data.content;
      console.log(this.onewayList);
    })

  }

  generateArrDate(middleDay: any) {
    console.log(middleDay);
    moment.locale('vi');
    return [
      moment(middleDay).subtract(2, 'days').format('dddd, Do, MMMM, YYYY'),
      moment(middleDay).subtract(1, 'days').format('dddd, Do, MMMM, YYYY'),
      moment(middleDay).format('dddd, Do, MMMM, YYYY'),
      moment(middleDay).add(1, 'days').format('dddd, Do, MMMM, YYYY'),
      moment(middleDay).add(2, 'days').format('dddd, Do, MMMM, YYYYY'),
    ]
  }

  setDateTimeArrival(date: any) {
    let previous1Convert;
    let previous2Convert;
    let next1Convert;
    let next2Convert;
    let previous1;
    let previous2;
    let next1;
    let next2;

    if (new Date(date).getMonth() < 9) {
      previous1 = new Date(new Date(date).getTime() - (60 * 60 * 24 * 1000 * 2));
      previous1Convert = previous1.getUTCFullYear() + "-" + '0' + (previous1.getMonth() + 1) + "-" + previous1.getDate();
    } else {
      previous1Convert = previous1.getUTCFullYear() + "-" + (previous1.getMonth() + 1) + "-" + previous1.getDate();
    }
    if (new Date(date).getMonth() < 9) {
      previous2 = new Date(new Date(date).getTime() - (60 * 60 * 24 * 1000));
      previous2Convert = previous2.getUTCFullYear() + "-" + '0' + (previous2.getMonth() + 1) + "-" + previous2.getDate();
    } else {
      previous2Convert = previous2.getUTCFullYear() + "-" + (previous2.getMonth() + 1) + "-" + previous2.getDate();
    }
    if (new Date(date).getMonth() < 9) {
      next1 = new Date(new Date(date).getTime() + (60 * 60 * 24 * 1000));
      next1Convert = next1.getUTCFullYear() + "-" + '0' + (next1.getMonth() + 1) + "-" + next1.getDate();
    } else {
      next1Convert = next1.getUTCFullYear() + "-" + (next1.getMonth() + 1) + "-" + next1.getDate();
    }
    if (new Date(date).getMonth() < 9) {
      next2 = new Date(new Date(date).getTime() + (60 * 60 * 24 * 1000 * 2));
      next2Convert = next2.getUTCFullYear() + "-" + '0' + (next2.getMonth() + 1) + "-" + next2.getDate();
    } else {
      next2Convert = next2.getUTCFullYear() + "-" + (next2.getMonth() + 1) + "-" + next2.getDate();
    }
    console.log(previous1Convert);
    console.log(previous2Convert);
    console.log(next1Convert);
    console.log(next2Convert);
    this.dateTime.push(previous1Convert);
    this.dateTime.push(previous2Convert);
    this.dateTime.push(date);
    this.dateTime.push(next1Convert);
    this.dateTime.push(next2Convert);
  }

  reset() {
    this.searchForm.reset();
  }

  setCurrentDate(date: string) {
    this.currentClick = date;
  }

  checkAge(birthday: AbstractControl): ValidationErrors {
    let dayOfBirth = birthday.value;
    let birthdayToSeconds = new Date(dayOfBirth).getTime();
    let currentToSeconds = new Date().getTime();
    let between = currentToSeconds - birthdayToSeconds;
    let age = between / (60 * 60 * 24 * 1000 * 365);
    console.log(age < 18 || age > 150);
    if (age < 18 || age > 150) {
      return {
        'errorAge': true
      }
    }
    return null;
  }

  getDate() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    console.log(toDate);

    if (toDate < 10) {
      toDate = "0" + toDate;
    }
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year: any = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
    console.log(this.minDate);
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(DetailFlightComponent, {
    //   width: '250px'
    // });
  }

  sendDataIdFlight() {
    this.ticketService.flightToTicket[0] =this.startDate;
    this.ticketService.flightToTicket[1] =this.endDate;
  }
}
