import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlightService} from "../flight.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css']
})
export class DeleteFlightComponent implements OnInit {
  flightDto: any;
  flightId: number
  codeFlight: any;
  fromFlight: any;
  toFLight: any;
  id: any;
  constructor(private dialog: MatDialogRef<DeleteFlightComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private flightService: FlightService,
              private snackBar: MatSnackBar
  ) {
    console.log(data)
    this.flightId = this.data
  }

  ngOnInit(): void {

    this.id = this.data.datal;
    this.flightService.getFlightById(this.id).subscribe((data)=>{
      console.log(data)
      this.flightDto = data;
    })
  }

  deleteFlight() {
    this.flightService.deleteFlight(this.id).subscribe(() => {
      this.dialog.close()
      this.snackBar.open('Đã xóa chuyến bay thành công', 'OK');
    },() =>{
        this.snackBar.open('Chuyến bay này đã có người đặt, nên không thể xóa được', 'error');
    }
    )
  }


}
