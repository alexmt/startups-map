export class GoogleMapsService {
  private static servicePromise: Promise<GoogleMapsService> = null;

  static create(window: Window, key: string): Promise<GoogleMapsService> {
    if (GoogleMapsService.servicePromise == null) {
      GoogleMapsService.servicePromise = new Promise<GoogleMapsService>(resolve => {
        window['__googleMapsInit'] = function () {
          resolve(new GoogleMapsService(window['google']));
        };
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `//maps.googleapis.com/maps/api/js?key=${key}&callback=__googleMapsInit`;
        window.document.body.appendChild(script);
      });
    }
    return GoogleMapsService.servicePromise;
  }

  constructor(private google: any) {}

  initMap(container, center: {lat: number, lng: number}) {
    return new this.google.maps.Map(container, {
      center: center,
      zoom: 16
    });
  }
}
