import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../flight/flight.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {LayoutService} from "../layout.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  layoutList: any
  lastArray : any = [];
  minDate: any = "";
  searchForm: FormGroup;
  check: Boolean = true;
  onewayList: any[];
  twowayList: any[];
  dateArr: any;
  dateDes: any;
  dateTime: any[] = [];
  indexPagination: number = 0;
  totalPagination: number;
  currentClick: string;
  checkDate: Boolean = true;


  constructor(private flightService: FlightService,
              public dialog: MatDialog,
              private layoutService : LayoutService) {
    this.layoutService.getListAllFlight().subscribe((data)=>{
      this.layoutList = data;
      this.lastArray.push(this.layoutList[5]);
      this.lastArray.push(this.layoutList[6]);
      this.lastArray.push(this.layoutList[7]);
      this.lastArray.push(this.layoutList[8]);
      this.lastArray.push(this.layoutList[9]);
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      fromFlight: new FormControl('', Validators.required),
      toFlight: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      searchOption: new FormControl('', Validators.required),
      sortOption: new FormControl('')
    });
  }
  search() {
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
}
