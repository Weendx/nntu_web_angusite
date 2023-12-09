import { Component } from '@angular/core';

@Component({
  selector: 'lk-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public postData = {
    header: '',
    bodyPreview: '',
    body: '',
    formMsg: '',
    formMsgId: 0
  }
  
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
