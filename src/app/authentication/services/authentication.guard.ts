import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.user.pipe(take(1), map(user => {
            const isAuth = !!user;

            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree([ '/authentication' ]);
        }));
    }
}