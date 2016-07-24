import { Location } from './location';

export interface Company {
  name: string;
  address?: string;
  addressLocation?: Location;
}
