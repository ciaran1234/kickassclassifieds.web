import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthorizationValidator implements CanActivate {

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) { }


    canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot) {
        if (localStorage.getItem('accessToken')) {
            return true;
        }

        this.router.navigate(['/account/signin'], { queryParams: { returnUrl: rss.url } });
    }
}