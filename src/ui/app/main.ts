import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import { GoogleMapsService, CompanyService } from './shared/index';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


window['startupsMap'] = {
  bootstrapApp() {
    GoogleMapsService.create(window, 'AIzaSyB6grVLtUhv608zkdrtGmgY_ziwU7dLNfM').then(
      googleMapsService => bootstrap(AppComponent, [
        appRouterProviders,
        provide(GoogleMapsService, { useValue: googleMapsService  }),
        provide(CompanyService, { useClass: CompanyService }),
        provide(LocationStrategy, { useClass: HashLocationStrategy })
      ]));
  }
};
