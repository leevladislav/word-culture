import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyWordsGuard implements CanActivate {

  constructor(
    private appService: AppService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const checkLocalStorage = this.appService.currentStorage$.pipe(map((res) => res));

    return checkLocalStorage.pipe(map((res) => {
      if (res.length) {
        return true;
      }

      this.router.navigate(['home']).then(() => false);
    }));
  }
}
