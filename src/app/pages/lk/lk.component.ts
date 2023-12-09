import { Component } from '@angular/core';
import { UserRole } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent {
  public userRole = UserRole;

  constructor (public userService: UserService) {}
}
