import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public darkTheme$ = new BehaviorSubject<boolean>(false);
  constructor() {
  }

  setDarkTheme(isDarkTheme: boolean) {
    return this.darkTheme$.next(isDarkTheme);
  }
}
