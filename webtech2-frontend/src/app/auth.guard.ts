import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BackendService } from 'src/services/backend.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private backendService: BackendService, private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        let isAuth: boolean = await new Promise((resolve, reject) => {
            this.backendService.isAuthenticated().subscribe(
                response => {
                    resolve(true);
                },
                error => {
                    this.router.navigate(["/login"]);
                    console.log(error);
                    reject(false);
                });
        })

        return isAuth;
    }
}
