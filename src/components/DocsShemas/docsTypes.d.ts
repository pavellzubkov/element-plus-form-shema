import { IBaseDoc } from "@/components/MyForm/MyFormTypes";

export interface IDocOne extends IBaseDoc {
  payload: {
    text1?: string;
    myUrl?: string;
    myRegexp?: string;
    custom?: string[];
  };
}
