import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { FilterPostsPipe } from './pipes/filter-posts.pipe';



@NgModule({
  declarations: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent,
    FilterPostsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent,
    FilterPostsPipe
  ]
})
export class SharedModule { }
