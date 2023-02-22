import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../authentication/models/user.model';
import { AuthenticationService } from '../authentication/services/authentication.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  user: User[] = [];

  changePasswordForm = {} as FormGroup;

  wantToChangePassword = false;
  passwordChanged = false;

  wantToDeleteAccount = false;

  changePasswordError: string = '';

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.userData;

    this.createForm();
  }

  createForm() {
    this.changePasswordForm = new FormGroup({
      'password': new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    });
  }

  onWantToChangePassword() {
    this.wantToChangePassword = true;
    this.wantToDeleteAccount = false;
  }

  onChangePassword() {
    this.wantToChangePassword = false;
    this.passwordChanged = true;
  }

  onChangePasswordDone() {
    this.passwordChanged = false;

    this.authenticationService.resetPassword(this.user[0].email).subscribe()
    
    this.authenticationService.logout();
  }

  onWantToDeleteAccount() {
    this.wantToDeleteAccount = true;
    this.wantToChangePassword = false;
  }

  onDeleteAccount() {
    this.wantToDeleteAccount = false;

    this.authenticationService.deleteAccount().subscribe()

    this.authenticationService.logout();
  }
}
