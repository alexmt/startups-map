import { Component } from '@angular/core';
import { CompanyList } from './company-list/company-list.component';

@Component({
  selector: 'startups-app',
  templateUrl: 'app.component.html',
  directives: [CompanyList]
})
export class AppComponent {

}
