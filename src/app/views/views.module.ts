import { NgModule } from '@angular/core';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';

@NgModule({
  declarations: [
    ViewsComponent,
    BasicPageComponent,
    InfoPageComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ViewsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ViewsModule
{

}
