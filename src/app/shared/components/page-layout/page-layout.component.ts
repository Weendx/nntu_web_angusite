import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageLayoutComponent {
  @Input() reversed: any;
}
