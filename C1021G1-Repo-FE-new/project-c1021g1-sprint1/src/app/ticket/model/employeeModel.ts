import {EmployeeTypeModel} from "./employeeTypeModel";

export class EmployeeModel {
  private _id:number;
  private _nameEmployee:string;
  private _gender:boolean;
  private _birthdayEmployee:string;
  private _phoneEmployee:string;
  private _emailEmployee:string;
  private _addressEmployee:string;
  private _employeeType:EmployeeTypeModel;
  private _delFlagEmployee:boolean;


  constructor(id: number, nameEmployee: string, gender: boolean, birthdayEmployee: string, phoneEmployee: string, emailEmployee: string, addressEmployee: string, employeeType: EmployeeTypeModel, delFlagEmployee: boolean) {
    this._id = id;
    this._nameEmployee = nameEmployee;
    this._gender = gender;
    this._birthdayEmployee = birthdayEmployee;
    this._phoneEmployee = phoneEmployee;
    this._emailEmployee = emailEmployee;
    this._addressEmployee = addressEmployee;
    this._employeeType = employeeType;
    this._delFlagEmployee = delFlagEmployee;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameEmployee(): string {
    return this._nameEmployee;
  }

  set nameEmployee(value: string) {
    this._nameEmployee = value;
  }

  get gender(): boolean {
    return this._gender;
  }

  set gender(value: boolean) {
    this._gender = value;
  }

  get birthdayEmployee(): string {
    return this._birthdayEmployee;
  }

  set birthdayEmployee(value: string) {
    this._birthdayEmployee = value;
  }

  get phoneEmployee(): string {
    return this._phoneEmployee;
  }

  set phoneEmployee(value: string) {
    this._phoneEmployee = value;
  }

  get emailEmployee(): string {
    return this._emailEmployee;
  }

  set emailEmployee(value: string) {
    this._emailEmployee = value;
  }

  get addressEmployee(): string {
    return this._addressEmployee;
  }

  set addressEmployee(value: string) {
    this._addressEmployee = value;
  }

  get employeeType(): EmployeeTypeModel {
    return this._employeeType;
  }

  set employeeType(value: EmployeeTypeModel) {
    this._employeeType = value;
  }

  get delFlagEmployee(): boolean {
    return this._delFlagEmployee;
  }

  set delFlagEmployee(value: boolean) {
    this._delFlagEmployee = value;
  }
}
