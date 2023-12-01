import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)}
  // {path: 'a', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
