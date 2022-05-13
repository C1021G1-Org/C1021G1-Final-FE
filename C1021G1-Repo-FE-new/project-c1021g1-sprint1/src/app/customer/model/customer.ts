export interface Customer {
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
export interface ICustomerType {
  id: number;
  nameCustomerType: string;
}
export interface ICountries {
  id: number;
  country: string;
}
