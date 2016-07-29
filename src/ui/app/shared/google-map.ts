import { Location } from './models';

export class GoogleMap {
  constructor(private google: any, private map: any) {}

  addMarker(title: String, location: Location) {
    new this.google.maps.Marker({
      title: title,
      map: this.map,
      position: location
    });
  }
}
