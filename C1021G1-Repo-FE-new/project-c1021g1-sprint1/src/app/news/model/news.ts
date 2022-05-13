import {Category} from "./category";

export interface News {
  id?: number;
  nameNews?: string;
  codeNews?: string;
  dateNews?: string;
  imageNews?: string;
  titleNews?: string;
  delFlagNews?: boolean;
  descriptionNews?: string;
  category?: Category;
}
