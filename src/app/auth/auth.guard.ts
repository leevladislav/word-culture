import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginService} from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    public loginService: LoginService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const checkUser = this.loginService.checkUser$.pipe(map((res) => res));

    return checkUser.pipe(map((res) => {
      console.log('AuthGuard checkUser', res);
      if (res) {
        console.log('AuthGuard');
        return true;
      }

      this.router.navigate(['home']).then(() => false);
    }));



    // const checkLocalStorage = this.appService.currentStorage$.pipe(map((res) => res));
    //
    // return checkLocalStorage.pipe(map((res) => {
    //   if (res.length) {
    //     return true;
    //   }
    //
    //   this.router.navigate(['home']).then(() => false);
    // }));
  }

}
