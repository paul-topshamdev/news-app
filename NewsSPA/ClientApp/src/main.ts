import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

export function getBaseUrl() {

  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  {
    provide: 'BASE_URL',
    useFactory: getBaseUrl,
    deps: []
  },
  {
    provide: "NEWS_API_BASE_URL",
    useValue: environment.newsServiceBaseUrl
  }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));
