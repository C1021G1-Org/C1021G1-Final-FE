export class SeatTypeModel {
  private _id: number;
  private _nameSeatType: string;
  private _priceSeatType: number;


  constructor(id: number, nameSeatType: string, priceSeatType: number) {
    this._id = id;
    this._nameSeatType = nameSeatType;
    this._priceSeatType = priceSeatType;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameSeatType(): string {
    return this._nameSeatType;
  }

  set nameSeatType(value: string) {
    this._nameSeatType = value;
  }

  get priceSeatType(): number {
    return this._priceSeatType;
  }

  set priceSeatType(value: number) {
    this._priceSeatType = value;
  }
}
