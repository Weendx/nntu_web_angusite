import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';



@NgModule({
  declarations: [
    RegistrationFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegistrationFormComponent
  ]
})
export class AuthModule { }
