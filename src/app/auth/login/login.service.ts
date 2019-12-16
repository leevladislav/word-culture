import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public checkUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userAdded = false;
  private users = [
    {
      email: 'vladislavlee@gmail.com',
      password: 'Ln0932389069'
    },
    {
      email: 'userguest@gmail.com',
      password: 'mmlJu4rndsjl3nlq'
    },
    {
      email: 'asdlaf@gmail.com',
      password: 'dsMNnrns0dvii324'
    },
    {
      email: 'bobr@gmail.com',
      password: '98JJKnk23JnweqeP0'
    },
  ];

  constructor() {
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
      const promiseSaving = new Promise((resolve, reject) => {
        const currentUser = this.users.find(
          (user) => user.email === data.email && user.password === data.password);

        if (currentUser) {
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.checkUser();

          if (this.userAdded) {
            resolve();
          }
        }

        reject('Wrong email or password');
      });

      return promiseSaving;
    }
  }
}
