import {IFlight} from "./i-flight";
import {ISeatType} from "./i-seat-type";

export interface ISeat {
  id?: number;
  codeSeat?: string;
  positionSeat?: number;
  statusSeat?: boolean;
  delFlagSeat?: number;
  seatType?: ISeatType;
  flightSeat?: IFlight;
}
