import { Component } from '@angular/core';

@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
})
export class InfoPageComponent
{

  constructor
  (
  )
  {
  }

  public redirectToLinkedIn()
  {
    window.location.href = 'https://www.linkedin.com/in/adriánrodríguezlópez';
  }


}
