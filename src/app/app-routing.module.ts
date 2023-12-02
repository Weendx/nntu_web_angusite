import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)},
  {path: 'signup', pathMatch: 'full', loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
