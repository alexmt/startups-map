import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../shared/index';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'companies-list',
  templateUrl: 'companies-list.component.html',
  styles: ['a { padding: 10px; }'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class CompaniesListComponent implements OnInit {
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
