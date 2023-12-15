import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { FilterPostsPipe } from './pipes/filter-posts.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';



@NgModule({
  declarations: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent,
    LoadingComponent,
    FilterPostsPipe,
    RelativeDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    PageLayoutComponent,
    MonitoringComponent,
    LoadingComponent,
    FilterPostsPipe,
    RelativeDatePipe
  ]
})
export class SharedModule { }
