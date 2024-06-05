import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'views.component.html',
  styleUrls: [ 'views.component.css'],
})
export class ViewsComponent
{
  constructor
  (
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
  )
  {

  }

  public in: boolean = false;

  public navigateToInfo()
  {
    this.router.navigate(['/FPAwithOpenAI/informacion']);
  }

  public navigateToProfile()
  {
    this.router.navigate(['/FPAwithOpenAI/perfil']);
  }

  public navigateToAccess()
  {
    this.router.navigate(['/FPAwithOpenAI/acceso']);
  }

  public navigateToPrincipal()
  {
    this.router.navigate(['/FPAwithOpenAI/principal']);
  }

  public navigateToGeneral()
  {
    this.router.navigate(['/FPAwithOpenAI/general']);
  }

  public ngOnInit(): void
  {
    this.in = this.checkCookie() ? true : false;
  }
  public ngAfterViewChecked(): void
  {
    this.in = this.checkCookie() ? true : false;
  }

  public checkCookie(): string
  {
    return this.cookieService.getCookie("email");
  }

  public exit(): void
  {
    this.exitSesion();
    this.cookieService.deleteCookie("email");
    this.cookieService.deleteCookie("usr");
    this.cookieService.deleteCookie("token");
    this.in = false;
    this.navigateToGeneral();
  }

  public exitSesion(): void
  {
    this.authService.exit().subscribe(
      (respuesta: any) => {
        console.log({respuesta})
      },
      (error: any) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }



}
