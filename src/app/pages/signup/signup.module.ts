import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationFormComponent } from 'src/app/components/registration-form/registration-form.component';


const routes: Routes = [
  {path: '', component: SignupComponent}
];

@NgModule({
  declarations: [
    SignupComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignupModule { }
