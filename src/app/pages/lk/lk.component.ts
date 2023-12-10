import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRole } from 'src/app/shared/types';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent {
  public userRole = UserRole;

  constructor (public userService: UserService) {}
}
