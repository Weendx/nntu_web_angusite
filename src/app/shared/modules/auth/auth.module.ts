import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChngpassFormComponent } from '../../components/chngpass-form/chngpass-form.component';



@NgModule({
  declarations: [
    RegistrationFormComponent,
    LoginFormComponent,
    ChngpassFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    RegistrationFormComponent,
    LoginFormComponent,
    ChngpassFormComponent
  ]
})
export class AuthModule { }
