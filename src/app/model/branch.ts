import {Page} from "./page";


export interface Branch {
  id?: number;
  name: string;
  code: string;
  address?: Address;
  contact: Contact;
  saturdayFullDay:boolean;
}

export interface BranchResponse {


    "_embedded" : {
      branchDTOes : Branch[];
    }
    page: Page;
}

export class Contact {
  email?: string;
  postBoxNo?: string;
  phoneNo?: string;
  phoneNoTwo?: string;
  phoneNoThree?: string;
}

export class Address {
  state?: string;
  city?: string;
  subCity?: string;
  houseNo?: string;
  street?: string;
  location?: {
    x: number;
    y: number;
  }
}

