import {AirlineTypeModel} from "./airlineTypeModel";

export class FlightModel {
  private _id:number;
  private _codeFlight:string;
  private _toFlight:string;
  private _fromFlight:string;
  private _dateStart:string;
  private _dateEnd:string;
  private _airlineType:AirlineTypeModel;
  private _delFlagFlight:boolean;


  constructor(id: number, codeFlight: string, toFlight: string, fromFlight: string, dateStart: string, dateEnd: string, airlineType: AirlineTypeModel, delFlagFlight: boolean) {
    this._id = id;
    this._codeFlight = codeFlight;
    this._toFlight = toFlight;
    this._fromFlight = fromFlight;
    this._dateStart = dateStart;
    this._dateEnd = dateEnd;
    this._airlineType = airlineType;
    this._delFlagFlight = delFlagFlight;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get codeFlight(): string {
    return this._codeFlight;
  }

  set codeFlight(value: string) {
    this._codeFlight = value;
  }

  get toFlight(): string {
    return this._toFlight;
  }

  set toFlight(value: string) {
    this._toFlight = value;
  }

  get fromFlight(): string {
    return this._fromFlight;
  }

  set fromFlight(value: string) {
    this._fromFlight = value;
  }

  get dateStart(): string {
    return this._dateStart;
  }

  set dateStart(value: string) {
    this._dateStart = value;
  }

  get dateEnd(): string {
    return this._dateEnd;
  }

  set dateEnd(value: string) {
    this._dateEnd = value;
  }

  get airlineType(): AirlineTypeModel {
    return this._airlineType;
  }

  set airlineType(value: AirlineTypeModel) {
    this._airlineType = value;
  }

  get delFlagFlight(): boolean {
    return this._delFlagFlight;
  }

  set delFlagFlight(value: boolean) {
    this._delFlagFlight = value;
  }
}
