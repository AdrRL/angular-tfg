import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
  {
    path: '',
    redirectTo: 'FPAwithOpenAI',
    pathMatch: 'full'
  },
  {
    path: 'FPAwithOpenAI',
    loadChildren: () => import('../app/views/views.module').then(m => m.ViewsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{

}
