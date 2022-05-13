import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket.service";
import {ITicket} from "../model/ticket/i-ticket";
import {ActivatedRoute} from "@angular/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit {

  id;
  day: string;
  month: string;
  year:string;
  time: string;
  ticket: ITicket
  datetime: string;

  constructor(private ticketService: TicketService,
              private activatedRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(data => {
      console.log(data);
      this.id = data.get('id');
      this.ticketService.getTicketById(this.id).subscribe(value => {
        this.ticket = value;
        console.log(this.ticket);
        this.year   = (this.ticket.seat.flightSeat.dateStart).slice(0,4);
        this.month  = (this.ticket.seat.flightSeat.dateStart).slice(5,7);
        this.day    = (this.ticket.seat.flightSeat.dateStart).slice(8,10);
        this.time   = (this.ticket.seat.flightSeat.dateStart).slice(11,this.ticket.seat.flightSeat.dateStart.length);
        this.datetime   = this.day + "-" + this.month + "-" + this.year + " " + this.time
        console.log(this.day)
        console.log(this.month)
        console.log(this.year)
        console.log(this.time)
        console.log(this.datetime)
        this.ticket.priceTicket = Number(this.ticket.priceTicket).toLocaleString()

      })
    });
  }

  generatePDF() {
    let data = document.getElementById('box');
    html2canvas(data).then(canvas => {
      let imgWidth = 210;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('ticket.pdf');
    });
  }

}
