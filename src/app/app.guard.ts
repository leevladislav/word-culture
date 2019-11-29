import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from './auth/login/login.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    private router: Router,
    public loginService: LoginService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // TODO: Extra map.
    const checkUser = this.loginService.checkUser$.pipe(map((res) => res));

    return this.loginService.checkUser$.pipe(map((res) => {
      if (res) {
        return true;
      }
      this.router.navigate(['auth']).then(() => false);
    }));
  }
}
