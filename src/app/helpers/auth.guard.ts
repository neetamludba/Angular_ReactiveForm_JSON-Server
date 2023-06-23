import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../account/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private accountService: AccountService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            console.log('im authorised');
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
