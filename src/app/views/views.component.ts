import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'views.component.html',
  styleUrls: [ 'views.component.css'],
})
export class ViewsComponent
{
  constructor(private router: Router)
  {

  }

  public navigateToInfo()
  {
    this.router.navigate(['/inicio/informacion']);
  }

  public navigateToPrincipal()
  {
    this.router.navigate(['/inicio/principal']);
  }

}
