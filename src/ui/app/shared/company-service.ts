import { Company } from './company';
import { companies } from './companies';

export class CompanyService {
  getCompanies(): Promise<Company[]> {
    return new Promise<Company[]>((resolve, reject) => {
      resolve(companies);
    });
  }
}
