import {SeatTypeModel} from "./seatTypeModel";
import {FlightModel} from "./flightModel";


export class SeatModel {
  private _id: number;
  private _codeSeat: string;
  private _statusSeat:boolean;
  private _seatType: SeatTypeModel;
  private _flight:FlightModel;
  private _delFlagSeat:boolean;


  constructor(id: number, codeSeat: string, statusSeat: boolean, seatType: SeatTypeModel, flight: FlightModel, delFlagSeat: boolean) {
    this._id = id;
    this._codeSeat = codeSeat;
    this._statusSeat = statusSeat;
    this._seatType = seatType;
    this._flight = flight;
    this._delFlagSeat = delFlagSeat;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get codeSeat(): string {
    return this._codeSeat;
  }

  set codeSeat(value: string) {
    this._codeSeat = value;
  }

  get statusSeat(): boolean {
    return this._statusSeat;
  }

  set statusSeat(value: boolean) {
    this._statusSeat = value;
  }

  get seatType(): SeatTypeModel {
    return this._seatType;
  }

  set seatType(value: SeatTypeModel) {
    this._seatType = value;
  }

  get flight(): FlightModel {
    return this._flight;
  }

  set flight(value: FlightModel) {
    this._flight = value;
  }

  get delFlagSeat(): boolean {
    return this._delFlagSeat;
  }

  set delFlagSeat(value: boolean) {
    this._delFlagSeat = value;
  }
}
