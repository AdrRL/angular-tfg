import { NgModule } from '@angular/core';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { PieChartComponent } from '../shared/pie-chart/pie-chart.component';
import { FormsModule } from '@angular/forms';
import { AccessComponent } from './access-page/access-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    ViewsComponent,
    BasicPageComponent,
    InfoPageComponent,
    PieChartComponent,
    AccessComponent,
    ProfilePageComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class ViewsModule
{

}
