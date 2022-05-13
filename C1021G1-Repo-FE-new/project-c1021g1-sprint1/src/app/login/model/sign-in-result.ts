import {Role} from "./role";

export interface SignInResult {
  email?: string;
  roles?: Role[];
  token?: string;
}
