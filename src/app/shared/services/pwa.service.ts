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
      this.showBtnInstallApp$.next(true);
    });
  }


  installApp() {
    this.deferredPrompt.prompt();
    this.showBtnInstallApp$.next(false);
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
