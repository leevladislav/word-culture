import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public checkUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  checkUser(data) {
    console.log('data', data);
  }
}
