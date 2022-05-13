import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlightService} from "../flight.service";
import {AirlineType} from "../model/airline-type";
import {MatDialog} from "@angular/material/dialog";
import {DeleteFlightComponent} from "../delete-flight/delete-flight.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-flight',
  templateUrl: './list-flight.component.html',
  styleUrls: ['./list-flight.component.css']
})
export class ListFlightComponent implements OnInit {
  isSearch:boolean;
  flightList: any;
  flightListNoPage: any;
  airlineTypeList: any;
  flightId: number;
  flightName: string;
  searchFlight: FormGroup;
  term: any;
  p: number;
  indexPagination: number = 0;
  totalPagination: number;
  page: any;
  checkNull: Boolean = false;


  constructor(
    private flightService: FlightService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  search(pageNumber: any) {
    if(pageNumber == '' || pageNumber == null){
      pageNumber = 0
      this.indexPagination = 0;
    }
    this.flightService.search(this.searchFlight.value.fromFlight, this.searchFlight.value.toFlight, this.searchFlight.value.dateStart,
      this.searchFlight.value.dateEnd, pageNumber).subscribe((data: any) => {
      this.flightList = data.content;
      this.totalPagination = data['totalPages'];
      this.snackBar.open('Đã tìm kiếm thành công', 'ok')
      this.checkNull = false;
    },error => {
        this.flightList = [];
        this.checkNull = true;
      this.snackBar.open('Đã tìm kiếm thất bại', 'error')
      }
    );
  }

  ngOnInit(): void {
    this.isSearch =true;
    this.flightService.getListAllFlight(0).subscribe((data: any) => {
      this.flightList = data.content;
      this.totalPagination = data['totalPages']
    }),
      this.flightService.getListAllAirlineType().subscribe(value => {
        this.airlineTypeList = value;
      })
    {
      this.searchFlight = this.formBuilder.group({
        id: [''],
        codeFlight: [''],
        fromFlight: [''],
        toFlight: [''],
        dateStart: [''],
        dateEnd: [''],
        delFlagFlight: [''],
        airlineType: ['']
      });
      // this.flightService.getListAllFlightNotPagination().subscribe((data: any) => {
      //   this.flightListNoPage = data['content'];
      //   console.log(this.flightListNoPage)
      //   if ((this.flightListNoPage.length % 5) != 0) {
      //     this.totalPagination = (Math.round(this.flightListNoPage.length / 5)) + 1;
      //   }
      // })
    }
  }

  checkFormNull() {
    if (this.searchFlight.get('fromFlight').value == ''
      && this.searchFlight.get('toFlight').value == ''
      && this.searchFlight.get('dateStart').value == ''
      && this.searchFlight.get('dateEnd').value == '') {
      return true;
    } else {
      return false;
    }

  }

  getFlightPerPage(pageNumber: number) {
    if (this.checkFormNull()) {
      this.flightService.getListAllFlight(pageNumber).subscribe((data: any) => {
        console.log('no search')
        this.flightList = data.content;
        this.totalPagination = data['totalPages']
      });
    } else {
      this.search(pageNumber);

    }
  }


  firtPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      console.log(this.indexPagination)
      this.getFlightPerPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getFlightPerPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getFlightPerPage(this.indexPagination);
  }


  openDialog(id) {
    const dialogRef = this.dialog.open(DeleteFlightComponent, {
      width: '500px',
      data: {datal: id},
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    });
  }
}
