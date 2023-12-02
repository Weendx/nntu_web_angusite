import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';



@NgModule({
  declarations: [
    ContainerComponent,
    PageLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    PageLayoutComponent
  ]
})
export class SharedModule { }
