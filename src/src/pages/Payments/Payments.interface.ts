import { Moment } from "moment-timezone";
import { PaymentType } from "./enums";
export interface MyWindow extends Window {
  myFunction(): void;
}
export interface BeneFilterForm {
  limit: number;
  currency?: [string] | undefined;
  country?: string | undefined;
  status?: [string] | undefined;
  nextToken?: string;
}
export interface PaymentFilterForm {
  limit: number;
  conversion?: boolean;
  fromToDate?: [Moment, Moment] | null;
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
  currencies?: [string] | undefined;
  type?: PaymentType;
  status?: string | undefined;
}

export interface Currencies {
  code: string;
  type: string;
  decimals: string;
  payments: string;
  name: string;
  mainCurrency: string;
}
