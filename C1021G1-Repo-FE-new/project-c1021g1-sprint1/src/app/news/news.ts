import {Category} from "./category";

export interface News {
  id?: number;
  codeNews?: string;
  dateNews?: string;
  delFlagNews?: boolean;
  descriptionNews?: string;
  imageNews?: string;
  nameNews?: string;
  titleNews?: string;
  category?: Category;
}
