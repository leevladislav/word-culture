import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public checkUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userAdded = false;
  private users = [
    {
      email: 1,
      password: 11
    },
    {
      email: 2,
      password: 22
    },
    {
      email: 3,
      password: 33
    },
  ];

  constructor(private router: Router) {
  }

  checkUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userAdded = true;
      this.checkUser$.next(this.userAdded);
    } else {
      this.userAdded = false;
      this.checkUser$.next(this.userAdded);
    }
  }

  saveUser(data) {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));

      this.checkUser();
      if (this.userAdded) {
        this.router.navigate(['home']).then(() => false);
      }
    }
  }
}
