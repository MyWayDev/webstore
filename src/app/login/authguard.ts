import { AuthInfo } from './authinfo';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,
            state:RouterStateSnapshot):Observable<boolean> {

        return this.authService.authInfo$
                .map(authInfo=>authInfo.isLoggedIn())
                .take(1)
                .do(allowed =>{
                    if(!allowed){
                        this.router.navigate(['/login'])
                    }
                });
 
            }
      
    
}