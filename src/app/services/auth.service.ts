import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { User, UserRegister, Userlogin } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';

  constructor
  (
    private http: HttpClient,
    private cookieService: CookieService,
  )
  {

  }

  public login(usr: Userlogin): Observable<Object>
  {
    return this.http.post(`${this.apiUrl}/loginUsuario`, usr);
  }

  public register(usr: UserRegister): Observable<Object>
  {
    return this.http.post(`${this.apiUrl}/registrarUsuario`, usr);
  }

  public checkUser(email: string): Observable<Object>
  {
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`${this.apiUrl}/comprobarUsuario/${email}`, {headers});
  }

  public exit(): Observable<Object>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`${this.apiUrl}/cerrarSesion/${email}`, {headers});
  }

  public addRecord(imagen: any, position: any): Observable<Object>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    let markerData = {
      imagen: imagen,
      positionLat: position.lat(),
      positionLng: position.lng()
    };

    return this.http.post(`/vacio/${email}`, markerData, {headers});
  }

}
