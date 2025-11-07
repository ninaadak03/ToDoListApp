import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Note: AppModule not created by this script. Add AppModule when ready.

if (false) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(undefined as any)
  .catch(err => console.error(err));
