export interface Location {
  lng: number;
  lat: number;
}

export interface Company {
  name: string;
  address?: string;
  addressLocation?: Location;
}
