import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService as CookieNGXService} from 'ngx-cookie-service';
import { UserProfile } from '../interfaces/user.interface';

@Injectable({
  providedIn: "root"
})
export class CookieService
{
  private userToken: string | null = null;
  private user: UserProfile | null = null;

	constructor
  (
		private _http: HttpClient,
    @Inject(CookieNGXService)
    private cookieService: CookieNGXService
	)
	{
	}


  public checkToken(token:any, email:any): Observable<boolean>
  {
    let data={token:token, email:email};
		return this._http.post<boolean>(`inicio/check-token`, data);

  }

  get isLoggedIn(): boolean
  {
    return this.userToken !== undefined && this.userToken !== null;
  }

  public setCookie(name: string, token: string): void
  {
    this.userToken = token;
    this.cookieService.set(name, token);
  }

  public getToken(): string | null
  {
    return this.userToken;
  }

  public getCookie(name: string): string
  {
    return this.cookieService.get(name);
  }

  public deleteCookie(name: string): void
  {
    this.cookieService.delete(name);
  }

  public setUser(usr: UserProfile | null): void
  {
    this.cookieService.set("usr", JSON.stringify(usr));
  }

  public getUser(): UserProfile | null
  {
    return this.user;
  }

}
