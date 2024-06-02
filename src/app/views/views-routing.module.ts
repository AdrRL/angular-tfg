import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { AccessComponent } from './access-page/access-page.component';

const routes: Routes = [
    {
        path: '',
        component: ViewsComponent,
        children: [
          {
            path: '',
            redirectTo: 'principal',
            pathMatch: 'full',
          },
          {
            path: 'principal',
            component: BasicPageComponent
          },
          {
            path: 'informacion',
            component: InfoPageComponent
          },
          {
            path: 'acceso',
            component: AccessComponent
          },
          {
            path: '**',
            component: BasicPageComponent
          },
        ]
    },
    {
        path: '**',
        component: ViewsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewsRoutingModule
{

}
