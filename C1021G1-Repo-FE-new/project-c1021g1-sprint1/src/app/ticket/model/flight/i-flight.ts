import {IAirlineType} from "./i-airline-type";

export interface IFlight {
  id?: number;
  codeFlight?:string;
  toFlight?:string;
  fromFlight?:string;
  dateStart?:string;
  dateEnd?:string;
  delFlagFlight?:boolean;
  airlineType?:IAirlineType;
}
