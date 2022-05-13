import {News} from "./news";

export interface Category {
  id?: number;
  name?: string;
  newList : News[]
}
