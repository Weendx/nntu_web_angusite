import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', 
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'signup', pathMatch: 'full', 
    loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule)
  },
  {
    path: 'reset-password', pathMatch: 'full', 
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule)
  },
  {
    path: 'lk', pathMatch: 'full', 
    loadChildren: () => import('./pages/lk/lk.module').then((m) => m.LkModule)
  },
  {
    path: 'news', pathMatch: 'full', 
    loadChildren: () => import('./pages/news/news.module').then((m) => m.NewsModule)
  },
  {
    path: 'downloads', pathMatch: 'full', 
    loadChildren: () => import('./pages/downloads/downloads.module').then((m) => m.DownloadsModule)
  },
  {
    path: 'post/:id', pathMatch: 'full', 
    loadChildren: () => import('./pages/post/post.module').then((m) => m.PostModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
