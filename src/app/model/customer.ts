import {Page} from './page';

export interface Customer {
  id?: number;
  full_name:string;
  phone:string;
  age: Date;
  education:string;
  nationality:string;
  valid_trade_license:boolean;
  branches:string;
}

export interface CustomerResponse {
  _embedded: {
    customersDTOes: Customer[];
  };
  page: Page;
}
