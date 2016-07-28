import { Inject, Component, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsService, CompanyService } from '../shared/index';

@Component({
  selector: 'companies-map',
  styles: [':host, .map-container { width: 100%; height: 100%; }'],
  template: '<div class="map-container"></div>'
})
export class CompaniesMap implements OnInit {
  constructor(
    @Inject(ElementRef) private el: ElementRef,
    @Inject(GoogleMapsService) private googleMapsService: GoogleMapsService,
    @Inject(CompanyService) private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompanies().then(companies => {
      if (companies.length > 0) {
        const mapContainer = $(this.el.nativeElement).find('.map-container')[0];
        const center = companies[0].addressLocation;
        this.googleMapsService.initMap(mapContainer, { lat: center.latitude, lng: center.longitude });
      }
    });
  }
}
