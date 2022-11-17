import {Page} from './page';

export interface BusinessType {
  id?: number;
  name: string;
  description: string;
}

export interface BusinessTypeResponse {
  _embedded: {
    businessSectorDTOes: BusinessType[];
  };
  page: Page;
}
