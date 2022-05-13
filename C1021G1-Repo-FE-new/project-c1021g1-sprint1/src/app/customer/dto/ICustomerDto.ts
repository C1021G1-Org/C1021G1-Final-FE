import {ICountries} from "../model/ICountries";
import {ICustomerType} from "../model/ICustomerType";

export interface ICustomerDto {
  id: any;
  nameCustomer: string;
  genderCustomer: boolean;
  idCardCustomer: string;
  birthdayCustomer: string;
  phoneCustomer: string;
  emailCustomer: string;
  addressCustomer: string;
  delFlagCustomer: boolean;
  countries: number;
  customerType: number;
}
