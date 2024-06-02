import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { User, Userlogin } from '../interfaces/user.interface';

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

  public getUsers(): Observable<Object>
  {
    return this.http.get(`${this.apiUrl}/obtenerUsuariosDB`);
  }

  public login(usr: Userlogin): Observable<Object>
  {
    console.log("Login");
    return this.http.post(`/loginUsuario`, usr);
  }

  public agregarGoogleUser(usr: Userlogin): Observable<Object>
  {
    return this.http.post(`/agregarGoogleUser`, usr);
  }

  public register(): Observable<Object> //usr: User
  {
    const exampleUser: User = {
      name: 'Adrian',
      surname: '',
      email: 'adrirodlop25@gmail.com',
      password: '1234'
    };

    console.log("Register");
    return this.http.post(`${this.apiUrl}/registrarUsuario`, exampleUser);
  }

  public checkUser(email: string): Observable<Object>
  {
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`/comprobarUsuario/${email}`, {headers});
  }

  public showUsers(): Observable<Object>
  {
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`/obtenerUsuarios`, {headers});
  }

  public getUser(): Observable<any>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`/obtenerUsuario/${email}`, {headers});
  }

  public exit(): Observable<Object>
  {
    let email = this.cookieService.getCookie("email");
    let token = this.cookieService.getCookie("token");
    let headers = new HttpHeaders({"Authorization": `Bearer ${token}`});

    return this.http.get(`/cerrarSesion/${email}`, {headers});
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

    console.log(markerData);

    return this.http.post(`/agregarMarcador/${email}`, markerData, {headers});
  }

}
