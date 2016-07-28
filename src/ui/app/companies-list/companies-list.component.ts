import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../shared/index';

@Component({
  selector: 'companies-list',
  templateUrl: 'companies-list.component.html'
})
export class CompaniesList implements OnInit {
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
