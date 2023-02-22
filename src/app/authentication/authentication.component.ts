import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';

import { AuthenticationResponseData, AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  forgotPassword = 'false';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

    this.forgotPassword = 'false';
  }

  onSubmit(form: NgForm) {
    // extra step in the case the user hacks the form...
    if (!form.valid) {
      return;
    };

    const email = form.value.email;
    const password = form.value.password;

    // create an observable so that we don't need to repeat code
    let authenticationObservable: Observable<AuthenticationResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authenticationObservable = this.authenticationService.login(email, password);
    } else {
      authenticationObservable = this.authenticationService.signUp(email, password);
    }

    // authenticationObservable.subscribe(response => {
    //   this.isLoading = false;
    //   this.router.navigate([ 'products' ]);
    // }, errorMessage => {
    //   this.error = errorMessage;
    //   this.isLoading = false;
    // });

    authenticationObservable.subscribe({
      next: response => {
        this.isLoading = false;
        this.router.navigate([ 'products' ]);
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onHandleError() {
    this.error = '';
  }

  onWantsToResetPassword() {
    this.forgotPassword = 'yes';
  }

  onResetPassword(form: NgForm) {
    const email = form.value.email;

    this.authenticationService.resetPassword(email).subscribe();
    this.forgotPassword = 'emailSent';
  }

  onResetEmailSent() {
    this.forgotPassword = 'false';
  }
}
