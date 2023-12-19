import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  @Input() header: string = "Страница не найдена";
  @Input() text?: string;
  @Input() doNotShowBack?: boolean;

}
