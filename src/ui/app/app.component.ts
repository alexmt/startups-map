import { Component } from '@angular/core';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesMapComponent } from './companies-map/companies-map.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'startups-app',
  templateUrl: 'app.component.html',
  styles: ['.map { height: 500px; }'],
  directives: [CompaniesListComponent, CompaniesMapComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {

}
