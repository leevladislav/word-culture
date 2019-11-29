import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {emailPattern, passwordPattern} from '../../app.constans';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hide = true;
  private subscriptions: Subscription[] = [];
  public loginMessageError;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]]
    });

    this.loginService.checkUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  logIn(event) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    const data = this.loginForm.value;

    this.loginService.saveUser(data).then(
      (result) => {
        this.router.navigate(['home']).then(() => false);
      },
      (error) => {
        this.loginMessageError = error;
      }
    );
  }
}
