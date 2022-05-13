import {ICustomerType} from "./ICustomerType";
import {ICountries} from "./ICountries";

export interface ICustomer {
  id: number;
  nameCustomer: string;
  genderCustomer: boolean;
  birthdayCustomer: string;
  idCardCustomer: string;
  phoneCustomer: string;
  emailCustomer: string;
  addressCustomer: string;
  delFlagCustomer: boolean;
  pointCustomer: number;
  imageCustomer: string;
  countries: ICountries;
  customerType: ICustomerType;
}
