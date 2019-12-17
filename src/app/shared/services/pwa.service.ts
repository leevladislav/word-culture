import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  showBtnInstallApp$ = new BehaviorSubject(false);
  deferredPrompt;

  constructor(private swUpdate: SwUpdate) {
  }

  beforeInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      console.log('beforeinstallprompt', e);
      this.showBtnInstallApp$.next(true);
    });
  }


  installApp() {
    console.log('installApp service');
    this.deferredPrompt.prompt();
    this.showBtnInstallApp$.next(false);
    // this.deferredPrompt = null;
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
