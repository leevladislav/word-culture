import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  deferredPrompt;

  constructor(private swUpdate: SwUpdate) {
  }

  beforeInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      console.log('beforeinstallprompt', e);
    });
  }


  installApp() {
    console.log('installApp service');
    this.deferredPrompt.prompt();
  }

  askUserToUpdate() {
    confirm('New version is available. Load New Version?');
  }

  checkCacheVersion() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {


        if (this.askUserToUpdate) {
          window.location.reload();
        }
      });
    }
  }
}
