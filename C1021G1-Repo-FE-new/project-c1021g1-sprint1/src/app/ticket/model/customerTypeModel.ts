export class CustomerTypeModel {
  private _id:number;
  private _nameCustomerType:string;


  constructor(id: number, nameCustomerType: string) {
    this._id = id;
    this._nameCustomerType = nameCustomerType;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameCustomerType(): string {
    return this._nameCustomerType;
  }

  set nameCustomerType(value: string) {
    this._nameCustomerType = value;
  }
}
