import {EmployeeModel} from "./employeeModel";
import {CustomerModel} from "./customerModel";
import {SeatModel} from "./seatModel";

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

  employee: EmployeeModel;

  customer: CustomerModel;

  idCard: string;

  dateTicket: string;

  seat: SeatModel;
}
