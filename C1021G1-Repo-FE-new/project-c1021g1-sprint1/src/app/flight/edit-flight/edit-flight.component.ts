import { Component, OnInit } from '@angular/core';
import {Airline} from "../model/airline";
import {FlightService} from "../flight.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Flight} from "../model/flight";

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {

  listAirline: Airline[];
  id;
  flight: Flight;

  constructor(private flightService: FlightService,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAirlineType();
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.id = data.get('id');
      this.flightService.getInfo(this.id).subscribe(value => {
        console.log(value)
        this.flight = value;
        this.editFlightForm.patchValue(this.flight);
      })
    });
  }

  editFlightForm = new FormGroup({
    id: new FormControl(''),
    codeFlight: new FormControl('', [Validators.required,
      Validators.pattern(/([VJ|VN|BB|JT])+([0-9]{4})$/)]),
    fromFlight: new FormControl('', [Validators.required,
      Validators.pattern(/([a-zA-Z(\\)]+)$/),
      Validators.minLength(10),
      Validators.maxLength(50)]),
    toFlight: new FormControl('', [Validators.required,
      Validators.pattern(/([a-zA-Z(\\)]+)$/),
      Validators.minLength(10),
      Validators.maxLength(50)]),
    dateStart: new FormControl('', Validators.required),
    dateEnd: new FormControl('', Validators.required),
    airlineType: new FormControl('', Validators.required)
  }, {validators: this.duplicate})

  getAirlineType() {
    this.flightService.getAirlineType().subscribe(data => {
      this.listAirline = data;
    })
  }

  updateFlight() {
    if (!this.editFlightForm.invalid) {
      this.flightService.updateFlight(this.activatedRoute.snapshot.params.id, this.editFlightForm.value).subscribe(() => {
        this.snackBar.open('Chỉnh sửa thông tin chuyến bay thành công!', '', {
          duration: 2000
        });
      })
    }
  }

  duplicate(control: AbstractControl): ValidationErrors | null {
    const f = control.get('fromFlight').value;
    const t = control.get('toFlight').value;
    return f != t ? null : {
      'checkDuplicate': true
    };
  }
}
