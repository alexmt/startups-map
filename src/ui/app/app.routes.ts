import { provideRouter, RouterConfig } from '@angular/router';
import { CompaniesMapComponent  } from './companies-map/companies-map.component';

const routes: RouterConfig = [
  { path: '', component: CompaniesMapComponent },
];

export const appRouterProviders = [
  provideRouter(routes)
];
