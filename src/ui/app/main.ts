import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

window['startupsMap'] = {
  bootstrapApp() {
    bootstrap(AppComponent);
  }
};
