import {Component, OnInit} from '@angular/core';
import {Airline} from "../model/airline";
import {FlightService} from "../flight.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";


@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  listAirline: Airline[];
  private errorss: any;
  public codeFlightError: any;

  constructor(private flightService: FlightService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAirlineType();
  }

  createFlightForm = new FormGroup({
    codeFlight: new FormControl('', [Validators.required,
      Validators.pattern(/([VJ|VN|BB|JT])+([0-9]{4})$/)]),
      fromFlight: new FormControl('', [Validators.required,
        Validators.pattern(/([a-zA-Z(\\)])$/),
        Validators.minLength(10),
        Validators.maxLength(50)]),
      toFlight: new FormControl('', [Validators.required,
        Validators.pattern(/([a-zA-Z(\\)])$/),
        Validators.minLength(10),
        Validators.maxLength(50)]),
    dateStart: new FormControl('', Validators.required),
    dateEnd: new FormControl('', Validators.required),
    airlineType: new FormControl('', Validators.required)
  }, {validators : this.duplicate})


  getAirlineType() {
    this.flightService.getAirlineType().subscribe(data => {
      this.listAirline = data;
    })
  }

  createFlight() {
    if (this.createFlightForm.valid) {
      this.flightService.createFlight(this.createFlightForm.value).subscribe(data => {
        console.log(data);
        this.snackBar.open('Thêm mới chuyến bay thành công!', '', {
          duration: 5000
        });
        this.router.navigateByUrl('/flight');
      }, error => {
        console.log(error);
        console.log(this.createFlightForm.value)
        this.errorss = error;
        this.codeFlightError = this.errorss.error.codeFlight;
        console.log(this.errorss.error.codeFlight)
      })
    }
  }

  validateCodeFlight() {
    this.codeFlightError = "";
  }


 duplicate(control : AbstractControl) : ValidationErrors | null {
  const f = control.get('fromFlight').value;
  const t = control.get('toFlight').value;
  return f != t ? null : {
    'checkDuplicate': true
  };

}

}
