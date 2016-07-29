import { Injectable } from '@angular/core';
import { Company } from './models';
import { companies } from './companies';

@Injectable()
export class CompanyService {
  getCompanies(): Promise<Company[]> {
    return new Promise<Company[]>(resolve => {
      resolve(companies);
    });
  }
}
