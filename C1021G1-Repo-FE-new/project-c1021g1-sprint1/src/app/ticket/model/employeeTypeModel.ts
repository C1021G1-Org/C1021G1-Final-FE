export class EmployeeTypeModel {
  private _id:number;
  private _nameEmployeeType:string;


  constructor(id: number, nameEmployeeType: string) {
    this._id = id;
    this._nameEmployeeType = nameEmployeeType;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameEmployeeType(): string {
    return this._nameEmployeeType;
  }

  set nameEmployeeType(value: string) {
    this._nameEmployeeType = value;
  }
}
