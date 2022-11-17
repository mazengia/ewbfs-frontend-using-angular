import {Page} from './page';

export interface Product {
  id?: number;
  name: string;
  description: string;
  budget: number;
}

export interface ProductResponse {
  _embedded: {
    productsDTOes: Product[];
  };
  page: Page;
}
