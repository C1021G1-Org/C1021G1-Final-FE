export interface Employee {
  id: number;
  nameEmployee:string;
  codeEmployee:string;
  genderEmployee:Boolean;
  birthdayEmployee:string;
  phoneEmployee:string;
  emailEmployee:string;
  addressEmployee:string;
  delFlagEmployee:Boolean;
  employeeType: EmployeeType;
}
export interface EmployeeType {
  id: number;
  nameEmployeeType:string;
}
// @ts-ignore
import {EmployeeType} from "./employeeType";

export interface Employee{
  id: number;
  name: string;
  code: string;
  gender: boolean;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  employeeType: EmployeeType;
}
