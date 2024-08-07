import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{

  constructor
  (
    private cookieService: CookieService,
    private router: Router
  )
  {
  }

  public canActivate ( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token = this.cookieService.getCookie('token');

    if (token)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/']);
      return false;
    }
  }
}
