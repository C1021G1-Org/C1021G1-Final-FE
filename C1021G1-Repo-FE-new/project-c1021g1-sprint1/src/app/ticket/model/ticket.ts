
import {Customer} from "../../customer/model/customer";
import {Employee} from "../../employee/model/employee";
import {Seat} from "../../flight/model/flight";

export interface Ticket {

  id: number;

  codeTicket: string;

  birthdayTicket: string;

  emailTicket: string;

  phoneTicket: string;

  genderTicket: boolean;


  statusTicket: boolean;

  priceTicket: number;

  delFlagTicket: boolean;

  pointTicket: number;

  buyerTicket: string;

  employee: Employee;

  customer: Customer;

  idCard: string;

  dateTicket: string;

  seat: Seat;

}
