import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";


import {MatSnackBar} from "@angular/material/snack-bar";

import {Router} from "@angular/router";
import {FlightModel} from "../model/flightModel";
import {SeatTicketDto} from "../model/seatTicketDto";
import {SeatTypeModel} from "../model/seatTypeModel";
import {Ticket} from "../model/ticketModel";


@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {

  flightList: FlightModel[] = [];
  arrChoiceSeat1: SeatTicketDto[] = []
  arrChoiceSeat2: SeatTicketDto[] = []
  numChoice1: number = 0
  numChoice2: number = 0
  arrayIdFlight = [];
  seatTypeList: SeatTypeModel[];
  seatTypePrice1: number = 0;
  seatTypePrice2: number = 0;
  priceTicket1: number = 0;
  priceTicket2: number = 0;
  sumPrice: number = 0;
  choiceTicketId1: Ticket[] = [];
  choiceTicketId2: Ticket[] = [];
  checkInvalid: boolean;
  checkInvalidButton1: boolean = true;
  checkInvalidButton2: boolean = true;
  seatChoice: boolean = true;
  updateOk1: boolean = true;
  updateOk2: boolean = true;
  seatList: SeatTicketDto[] = [];
  seatList2: SeatTicketDto[] = [];
  changeStyle: string = 'green';
  listIdSeat: number[];
  listIdSeat2: number[];

  constructor(private ticketService: TicketService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.arrayIdFlight = this.ticketService.flightToTicket
    this.loadData();
    this.getSeatTypeList();


  }


  private loadData() {
    let arrData: FlightModel[] = [];
    for (let i = 0; i < this.arrayIdFlight.length; i++) {
      this.ticketService.getFlightById(this.arrayIdFlight[i]).subscribe((data) => {
        console.log(this.arrayIdFlight[i])
        arrData.push(data);
      }, error => {
        console.log("có lỗi ")
      }, () => {
        let x = arrData.sort(function (a, b) {
          return Number(a.id) - Number(b.id)
        })
        console.log(x);
        console.log("aaaaabbbbbbbbbbbba")
        this.flightList = x;
      },)
    }
    if (this.arrayIdFlight.length <= 1) {
      this.updateOk2 = false
    }

  }

  private getSeatTypeList() {
    this.ticketService.getSeatTypeTicket().subscribe(data => {
      this.seatTypeList = data
      console.log(this.seatTypeList)


    }, error => {
      console.log("co loi khi loat data type seat")
    })
  }


  getValue(typeSeat: string, numberTicket, i) {
    let check1 = false
    let check2 = false
    if (i == 0) {
      this.ticketService.getListSeatTicket(this.flightList[i].id, typeSeat.toLowerCase()).subscribe((data) => {
        console.log(data)
        this.seatList = data;

      }, () => {
        console.log("cos looix khi laays lisst seat ")
        check1 = true;
      })
    }
    if (i == 1) {
      this.ticketService.getListSeatTicket(this.flightList[i].id, typeSeat.toLowerCase()).subscribe((data) => {
        console.log(data)
        this.seatList = data;

      }, () => {
        console.log("cos looix khi laays lisst seat ")
        check2 = true;
      })
    }
    if (!check2 && !check1) {
      for (let item of this.seatTypeList) {
        if (item.nameSeatType.toUpperCase() == typeSeat.toString().toUpperCase()) {
          console.log(typeSeat)
          if (i == 0) {
            this.seatTypePrice1 = item.priceSeatType;
            console.log(this.seatTypePrice1)
            this.priceTicket1 = (this.seatTypePrice1 + Number(this.flightList[i].airlineType.priceAirline)) * numberTicket
          } else {
            this.seatTypePrice2 = item.priceSeatType;
            console.log(this.seatTypePrice2)
            this.priceTicket2 = (this.seatTypePrice2 + Number(this.flightList[i].airlineType.priceAirline)) * numberTicket
          }
        }
      }
    }
    this.sumPrice = this.priceTicket1 + this.priceTicket2;
    console.log(this.seatList.length)
    // if (this.seatList.length >= this.numChoice1) {
    //   this.getTicketNum(i)
    // }
    // this.getTicketNum(i)
    // , typeSeat, numberTicket
  }


  getTicketNum(i: number) {
    // , value: string, value2: string
    if (i == 0) {
      this.choiceTicketId1 = [];
      this.checkInvalid = true;
      this.updateOk1 = true;
      console.log(this.listIdSeat)
      this.ticketService.getListTicketByIdSeat(this.listIdSeat).subscribe((data) => {
        this.choiceTicketId1 = data
        console.log(this.choiceTicketId1)
        this.checkInvalidButton1 = false;

      }, () => {
        console.log("có loi roi")
        this.checkInvalidButton1 = true;
      }, () => {
        this.checkInvalid = false;
      })
    }
    if (i == 1) {
      this.choiceTicketId2 = [];
      this.checkInvalid = true;
      this.updateOk2 = true;
      this.ticketService.getListTicketByIdSeat(this.listIdSeat2).subscribe((data) => {
        this.choiceTicketId2 = data
        console.log(this.choiceTicketId2)
        this.checkInvalidButton2 = false;
      }, () => {
        this.checkInvalidButton2 = true;

      }, () => {
        this.checkInvalid = false;
      })
    }


  }

  updatePriceTicket(typeSeat: string, numberTicket, index: number) {

    if (index == 0) {
      this.ticketService.listIdTicket1 = []
      this.updateOk1 = false;

      this.ticketService.priceTicket1 = this.seatTypePrice1 + Number(this.flightList[0].airlineType.priceAirline);
      this.ticketService.flight1 = this.flightList[0];
      console.log(this.ticketService.priceTicket1)
      console.log("giá tiền cho vé 1")
      console.log(this.ticketService.listIdTicket1)
      console.log("lisst id cho vé 1")
      this.getTicketNum(index)
      this.snackBar.open('chúc mừng bạn đã chọn ' + numberTicket + ' vé ' + typeSeat + ' thành công', 'OK', {

        duration: 3000,

      })

    }
    if (index == 1) {
      this.ticketService.listIdTicket2 = []
      this.updateOk2 = false;
      this.ticketService.priceTicket2 = this.seatTypePrice2 + Number(this.flightList[1].airlineType.priceAirline);
      this.ticketService.flight2 = this.flightList[1];

      console.log(this.ticketService.priceTicket2)
      console.log("giá tiền cho vé 2")
      console.log(this.ticketService.listIdTicket2)
      console.log("lisst id cho vé 2")
      this.getTicketNum(index)
      this.snackBar.open('chúc mừng bạn đã chọn ' + numberTicket + ' vé ' + typeSeat + ' thành công', 'OK', {

        duration: 3000,

      })

    }
  }


  createTicketPage() {
    this.ticketService.listIdTicket1 = this.choiceTicketId1
    this.ticketService.listIdTicket2 = this.choiceTicketId2
    this.router.navigateByUrl("/ticket/create")
  }


  changeStyleButton(i: number, itemx: SeatTicketDto, e) {
    console.log(i);
    // if (){
    console.log(itemx)
    let mepSeat: boolean = false;

    if (!itemx.status_seat) {
      if (this.arrChoiceSeat1.includes(itemx)) {
        e.target.style.background = 'green'
        this.changeStyle = 'green'
        this.arrChoiceSeat1.splice(this.arrChoiceSeat1.indexOf(itemx), 1)
        console.log(e.target)
        mepSeat = true
      }
      if (this.arrChoiceSeat1.length < this.numChoice1 && !mepSeat) {
        this.arrChoiceSeat1.push(itemx)
        // this.changeStyle =='green' ? this.changeStyle = 'blueviolet' : this.changeStyle = 'green'
        e.target.style.background = 'blueviolet'
        this.changeStyle = 'blueviolet'
        console.log(e.target)
      }
      mepSeat = false
      this.listIdSeat = this.arrChoiceSeat1.map(item => {
        return item.id
      })
      this.seatChoice = false
      console.log(this.arrChoiceSeat1);
      console.log(this.listIdSeat);


    } else {

      this.snackBar.open('ghế này đã được đặt vui long chọn cái khác', 'OK', {

        duration: 3000,

      })
    }
  }

  setNumTicket(value: string, i: number) {
    if (i == 0) {
      this.numChoice1 = Number(value)
    }
    if (i == 1) {
      this.numChoice2 = Number(value)
    }
  }
}
