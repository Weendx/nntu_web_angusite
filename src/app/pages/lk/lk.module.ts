import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LkComponent } from './lk.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {path: '', component: LkComponent}
];

@NgModule({
  declarations: [
    LkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LkModule { }