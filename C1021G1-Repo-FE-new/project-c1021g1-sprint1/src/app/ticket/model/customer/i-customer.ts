import {ICustomerType} from "./i-customer-type";

export interface ICustomer {
  id?: number;
  nameCustomer?: string;
  genderCustomer?: boolean;
  birthdayCustomer?: string;
  idCardCustomer?: string;
  phoneCustomer?: string;
  emailCustomer?: string;
  addressCustomer?: string;
  delFlagCustomer?: string;
  pointCustomer?: number;
  imageCustomer?: string;
  customerType?: ICustomerType;
}
