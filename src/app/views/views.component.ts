import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'views.component.html',
  styleUrls: [ 'views.component.css'],
})
export class ViewsComponent
{
  constructor
  (
    private router: Router
  )
  {

  }

  public navigateToInfo()
  {
    this.router.navigate(['/FPAwithOpenAI/informacion']);
  }

  public navigateToAccess()
  {
    this.router.navigate(['/FPAwithOpenAI/acceso']);
  }

  public navigateToPrincipal()
  {
    this.router.navigate(['/FPAwithOpenAI/principal']);
  }

}
