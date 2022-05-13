export class CountriesModel {
  private _id:number;
  private _country:string


  constructor(id: number, country: string) {
    this._id = id;
    this._country = country;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }
}
