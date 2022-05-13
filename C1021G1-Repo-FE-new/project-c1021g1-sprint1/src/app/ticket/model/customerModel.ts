import {CustomerTypeModel} from "./customerTypeModel";
import {CountriesModel} from "./countriesModel";

export class CustomerModel {
  private _id: number;
  private _nameCustomer: string;
  private _genderCustomer: boolean;
  private _birthdayCustomer: string;
  private _idCardCustomer: string;
  private _phoneCustomer: string;
  private _emailCustomer: string;
  private _addressCustomer: string;
  private _pointCustomer: number;
  private _imageCustomer: string;
  private _customerType: CustomerTypeModel;
  private _countries: CountriesModel;
  private _delFlagCustomer:boolean;


  constructor(id: number, nameCustomer: string, genderCustomer: boolean, birthdayCustomer: string, idCardCustomer: string, phoneCustomer: string, emailCustomer: string, addressCustomer: string, pointCustomer: number, imageCustomer: string, customerType: CustomerTypeModel, countries: CountriesModel, delFlagCustomer: boolean) {
    this._id = id;
    this._nameCustomer = nameCustomer;
    this._genderCustomer = genderCustomer;
    this._birthdayCustomer = birthdayCustomer;
    this._idCardCustomer = idCardCustomer;
    this._phoneCustomer = phoneCustomer;
    this._emailCustomer = emailCustomer;
    this._addressCustomer = addressCustomer;
    this._pointCustomer = pointCustomer;
    this._imageCustomer = imageCustomer;
    this._customerType = customerType;
    this._countries = countries;
    this._delFlagCustomer = delFlagCustomer;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nameCustomer(): string {
    return this._nameCustomer;
  }

  set nameCustomer(value: string) {
    this._nameCustomer = value;
  }

  get genderCustomer(): boolean {
    return this._genderCustomer;
  }

  set genderCustomer(value: boolean) {
    this._genderCustomer = value;
  }

  get birthdayCustomer(): string {
    return this._birthdayCustomer;
  }

  set birthdayCustomer(value: string) {
    this._birthdayCustomer = value;
  }

  get idCardCustomer(): string {
    return this._idCardCustomer;
  }

  set idCardCustomer(value: string) {
    this._idCardCustomer = value;
  }

  get phoneCustomer(): string {
    return this._phoneCustomer;
  }

  set phoneCustomer(value: string) {
    this._phoneCustomer = value;
  }

  get emailCustomer(): string {
    return this._emailCustomer;
  }

  set emailCustomer(value: string) {
    this._emailCustomer = value;
  }

  get addressCustomer(): string {
    return this._addressCustomer;
  }

  set addressCustomer(value: string) {
    this._addressCustomer = value;
  }

  get pointCustomer(): number {
    return this._pointCustomer;
  }

  set pointCustomer(value: number) {
    this._pointCustomer = value;
  }

  get imageCustomer(): string {
    return this._imageCustomer;
  }

  set imageCustomer(value: string) {
    this._imageCustomer = value;
  }

  get customerType(): CustomerTypeModel {
    return this._customerType;
  }

  set customerType(value: CustomerTypeModel) {
    this._customerType = value;
  }

  get countries(): CountriesModel {
    return this._countries;
  }

  set countries(value: CountriesModel) {
    this._countries = value;
  }

  get delFlagCustomer(): boolean {
    return this._delFlagCustomer;
  }

  set delFlagCustomer(value: boolean) {
    this._delFlagCustomer = value;
  }
}
