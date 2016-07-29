import { Inject, Component, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsService, CompanyService, Company } from '../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'companies-map',
  styles: [':host, .map-container { width: 100%; height: 100%; }'],
  template: '<div class="map-container"></div>'
})
export class CompaniesMapComponent implements OnInit {
  constructor(
    @Inject(ElementRef) private el: ElementRef,
    @Inject(GoogleMapsService) private googleMapsService: GoogleMapsService,
    @Inject(CompanyService) private companyService: CompanyService,
    @Inject(Router) private router: Router) {}

  private getSelectedCompany(companies: Company[], companyName: String): Company {
    let company: Company = null;
    if (companyName) {
      company = companies.find(item => item.name === companyName);
    }
    return company || companies[0];
  }

  ngOnInit() {
    this.companyService.getCompanies().then(companies => {
      if (companies.length > 0) {
        const mapContainer = $(this.el.nativeElement).find('.map-container')[0];
        const company = this.getSelectedCompany(companies, this.router.routerState.snapshot.queryParams['name']);
        const map = this.googleMapsService.initMap(mapContainer, company.addressLocation, 16);
        companies.forEach(company => map.addMarker(company.name, company.addressLocation));
        this.router.routerState.queryParams.subscribe(params => {
          map.setCenter(this.getSelectedCompany(companies, params['name']).addressLocation);
        });
      }
    });
  }
}
