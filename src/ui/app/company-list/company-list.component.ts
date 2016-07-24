import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../shared/index';

@Component({
  selector: 'company-list',
  templateUrl: 'company-list.component.html'
})
export class CompanyList implements OnInit {
  companies: Company[] = [];
  companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  ngOnInit() {
    this.companyService.getCompanies().then(companies => {
      this.companies = companies;
    });
  }
}
