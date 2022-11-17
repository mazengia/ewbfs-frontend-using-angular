import {Page} from './page';

export interface Status {
  id?: number;
  name: string;
  description: string;
}

export interface StatusResponse {
  _embedded: {
    statusDTOes: Status[];
  };
  page: Page;
}
