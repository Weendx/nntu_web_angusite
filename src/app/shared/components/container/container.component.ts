import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  @Input() header?: string;
  @Input() style?: string;
  @Output() headerClick = new EventEmitter<void>();

  public onHeaderClick() {
    this.headerClick.emit();
  }
}
