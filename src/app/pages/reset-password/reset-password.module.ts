import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from 'src/app/shared/modules/auth/auth.module';
import { ResetPasswordComponent } from './reset-password.component';


const routes: Routes = [
  {path: '', component: ResetPasswordComponent}
];

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResetPasswordModule { }
