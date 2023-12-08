import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent {
  public postData = {
    header: '',
    bodyPreview: '',
    body: '',
    formMsg: '',
    formMsgId: 0
  }
  constructor (public userService: UserService) {}

  public addPost() {
    console.log(this.postData);
    if (!this.postData.body || !this.postData.bodyPreview || !this.postData.header) {
      this.postData.formMsg = 'Заполните все поля';
      this.postData.formMsgId += 1;
      return;
    }
    // form should be valid here...
    this.postData.formMsg = 'Запись добавлена';
    this.postData.formMsgId += 1;
    this.postData.body = '';
    this.postData.header = '';
    this.postData.bodyPreview = '';
  }
}
