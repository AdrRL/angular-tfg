import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
})
export class InfoPageComponent
{

  constructor
  (
    private authService: AuthService,
  )
  {
    this.register();
  }

  public register(): void
  {
    this.authService.register().subscribe(

    );
  }

}
