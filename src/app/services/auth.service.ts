import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { User, UserProfile, UserRegister, Userlogin } from '../interfaces/user.interface';
import { ApiResponse } from '../interfaces/result.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl: string = 'http://localhost:3000';
  private apiUrl: string = 'https://servidortfg.azurewebsites.net';

  constructor
  (
    private http: HttpClient,
    private cookieService: CookieService,
  )
  {

  }



  public login(usr: Userlogin): Observable<Object>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/loginUsuario`, usr, { headers, withCredentials: true });
  }

  public loginGoogleUser(usr: Userlogin): Observable<Object>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/agregarGoogleUser`, usr, { headers, withCredentials: true });
  }

  public loginGitHubUser(usr: Userlogin): Observable<Object>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/agregarGitHubUser`, usr, { headers, withCredentials: true });
  }

  public register(usr: UserRegister): Observable<Object>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/registrarUsuario`, usr, { headers, withCredentials: true });
  }

  public checkUser(email: string): Observable<Object>
  {
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' });

    return this.http.get(`${this.apiUrl}/comprobarUsuario/${email}`, {headers, withCredentials: true });
  }

  public exit(): Observable<Object>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' });

    return this.http.get(`${this.apiUrl}/cerrarSesion/${email}`, {headers, withCredentials: true });
  }

  public addRecord(name: string, record: ApiResponse): Observable<Object>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' });

    let recordData = {
      name: name,
      data: record
    };

    return this.http.post(`${this.apiUrl}/addRecord/${email}`, recordData, {headers, withCredentials: true });
  }

  public getUser(): Observable<any>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' });

    return this.http.get(`${this.apiUrl}/obtenerUsuario/${email}`, {headers, withCredentials: true });
  }

  public updateUser(profile: UserProfile): Observable<any>
  {
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' });

    return this.http.put(`${this.apiUrl}/actualizarUsuario/${profile.email}`, profile, {headers, withCredentials: true });
  }

}
