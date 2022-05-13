import {IFlight} from "../flight/i-flight";
import {ISeat} from "../flight/i-seat";
import {ICustomer} from "../customer/i-customer";
import {IEmployee} from "../employee/i-employee";

export interface ITicket {
  id?: number;
  codeTicket?: string;
  emailTicket?: string;
  phoneTicket?: string;
  genderTicket?: string;
  statusTicket?: string;
  priceTicket?: string;
  delFlagTicket?: boolean;
  pointTicket ?: number;
  buyerTicket?: string;
  birthdayTicket?: string;
  idCard ?: string;
  dateTicket?: string;
  seat?: ISeat;
  customer?: ICustomer;
  employee?: IEmployee;

}
