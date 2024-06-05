import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.css'],
})
export class GeneralPageComponent
{

  constructor
  (
    private router: Router,
    private cookieService: CookieService,
  )
  {
  }

  public goTo(): void
  {
    if (this.checkCookie())
      this.router.navigate(['/FPAwithOpenAI/principal']);
    else
      this.router.navigate(['/FPAwithOpenAI/acceso']);

  }

  public checkCookie(): string
  {
    return this.cookieService.getCookie("email");
  }


}
