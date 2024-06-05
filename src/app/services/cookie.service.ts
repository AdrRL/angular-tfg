import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService as CookieNGXService} from 'ngx-cookie-service';

@Injectable({
  providedIn: "root"
})
export class CookieService
{
	constructor
  (
    @Inject(CookieNGXService)
    private cookieService: CookieNGXService
	)
	{
	}

  public setCookie(name: string, token: string): void
  {
    this.cookieService.set(name, token);
  }

  public getCookie(name: string): string
  {
    return this.cookieService.get(name);
  }

  public deleteCookie(name: string): void
  {
    this.cookieService.delete(name);
  }

}
