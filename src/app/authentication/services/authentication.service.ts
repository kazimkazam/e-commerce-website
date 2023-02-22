import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { ResetPasswordResponse } from "src/app/shared/models/updateUserInfo.model";


export interface AuthenticationResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: string
};

@Injectable()
export class AuthenticationService {
    firebaseKey = environment.firebaseKey;

    user = new BehaviorSubject<User | null>(null);

    // userData so that we can use user info automatically
    userData: User[] = [];

    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    signUp(email: string, password: string) {
        // the response will be of type AuthResponseData
        return this.http.post<AuthenticationResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseKey}`,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn))));
    }

    login(email: string, password: string) {
        return this.http.post<AuthenticationResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn))));
    }

    autoLogin() {
        const userData: {
            email: string, 
            id: string, 
            _token: string, 
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData')!);

        if (!userData) {
            return;
        };

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);

            this.userData.push(loadedUser);

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate([ '/' ]);

        // localStorage.clear();
        localStorage.removeItem('userData');
        
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        };
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    // -------------------------------------------------------------------------------------------------------------------
    // handle errors
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        // if the error is unknown
        if (!error.error || !error.error.error) {
            // return throwError(errorMessage);
        return throwError(() => errorMessage);
        };

        // if there is a error message
        switch(error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email was not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is incorrect!';
                break;
            case 'INVALID_ID_TOKEN':
                errorMessage = 'Invalid user ID token!';
                break;
            case 'USER_NOT_FOUND':
                errorMessage = 'The user was not found!';
                break;
            case 'WEAK_PASSWORD':
                errorMessage = 'The password must be 6 characters long or more';
                break;
            default:
                errorMessage = 'An unknown error occurred!';
                break;
        };
        // return throwError(errorMessage);
        return throwError(() => errorMessage);
    }

    // -------------------------------------------------------------------------------------------------
    private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
        // get expiration date in miliseconds
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);

        this.userData.push(user);

        // start the auto logout, because it will receive the token expiration time and so it will auto logout of the session at that time
        this.autoLogout(expiresIn * 1000);

        // store in local storage
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // ----------------------------------------------------------------------------------------
    // update authentication info

    resetPassword(email: string) {
        return this.http.post<ResetPasswordResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.firebaseKey}`, {
            requestType: "PASSWORD_RESET",
            email: email
        })
    }

    deleteAccount() {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${this.firebaseKey}`, {
            idToken: this.user.value?.token
        })
    }
}