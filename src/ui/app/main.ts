import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { AppComponent } from './app.component';
import { GoogleMapsService, CompanyService } from './shared/index';

window['startupsMap'] = {
  bootstrapApp() {
    GoogleMapsService.create(window, 'AIzaSyB6grVLtUhv608zkdrtGmgY_ziwU7dLNfM').then(
      googleMapsService => bootstrap(AppComponent, [
        provide(GoogleMapsService, { useValue: googleMapsService  }),
        provide(CompanyService, { useClass: CompanyService })
      ]));
  }
};
