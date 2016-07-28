import { Component } from '@angular/core';
import { CompaniesList } from './companies-list/companies-list.component';
import { CompaniesMap } from './companies-map/companies-map.component';

@Component({
  selector: 'startups-app',
  templateUrl: 'app.component.html',
  styles: ['.map { height: 500px; }'],
  directives: [CompaniesList, CompaniesMap]
})
export class AppComponent {

}
