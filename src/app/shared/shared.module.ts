import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';



@NgModule({
  declarations: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent
  ]
})
export class SharedModule { }
