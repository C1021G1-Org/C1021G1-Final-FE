export class AirlineTypeModel {
  private _id:number;
  private _nameAirline:string;
  private _priceAirline:number;
  private _imageAirline:string;
  private _delFlagAirline:boolean;


  constructor(id: number, nameAirline: string, priceAirline: number, imageAirline: string, delFlagAirline: boolean) {
    this._id = id;
    this._nameAirline = nameAirline;
    this._priceAirline = priceAirline;
    this._imageAirline = imageAirline;
    this._delFlagAirline = delFlagAirline;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameAirline(): string {
    return this._nameAirline;
  }

  set nameAirline(value: string) {
    this._nameAirline = value;
  }

  get priceAirline(): number {
    return this._priceAirline;
  }

  set priceAirline(value: number) {
    this._priceAirline = value;
  }

  get imageAirline(): string {
    return this._imageAirline;
  }

  set imageAirline(value: string) {
    this._imageAirline = value;
  }

  get delFlagAirline(): boolean {
    return this._delFlagAirline;
  }

  set delFlagAirline(value: boolean) {
    this._delFlagAirline = value;
  }
}
