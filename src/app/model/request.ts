import {Page} from './page';
import {Status} from "./status";
import {Customer} from "./customer";
import {Product} from "./product";
import {BusinessType} from "./businessType";

export interface Requests {
  id?: number;
  remark:string;
  requested_loan_amt:number;
  no_of_year_in_business	:number;
  have_collateral:boolean;
  fully_owned_by_business:boolean;
  able_to_pay_5_persent:boolean;
  status:Status;
  customers	:Customer;
  products	:Product;
  businesses:BusinessType;
}

export interface RequestsResponse {
  _embedded: {
    requestsDTOes: Requests[];
  };
  page: Page;
}
