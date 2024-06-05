import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { AccessComponent } from './access-page/access-page.component';
import { GeneralPageComponent } from './general-page/general-page.component';
import { ProfilePageComponent } from './Profile-page/Profile-page.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ViewsComponent,
        children: [
          {
            path: '',
            redirectTo: 'general',
            pathMatch: 'full',
          },
          {
            path: 'general',
            component: GeneralPageComponent
          },
          {
            path: 'principal',
            component: BasicPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'informacion',
            component: InfoPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'acceso',
            component: AccessComponent
          },
          {
            path: 'perfil',
            component: ProfilePageComponent,
            canActivate: [AuthGuard]
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
