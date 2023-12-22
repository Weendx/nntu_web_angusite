import { Component } from '@angular/core';
import { IPost } from 'src/app/shared/models';
import { NotificationService, PostService, UserService } from 'src/app/shared/services';
import { Status } from 'src/app/shared/types';

@Component({
  selector: 'lk-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public postData = {
    header: '',
    bodyPreview: '',
    body: ''
  }
  private formMsgId = 0;
  
  constructor(
    private postService: PostService, 
    private userService: UserService,
    private notifyService: NotificationService
  ) {}

  public addPost() {
    console.log(this.postData);
    if (!this.postData.body || !this.postData.bodyPreview || !this.postData.header) {
      this.notifyService.send(`(${++this.formMsgId}) Заполните все поля`, Status.None);
      return;
    }
    if (!this.userService.isLoggedIn || !this.userService.currentUser?.id) {
      this.notifyService.send(`(${++this.formMsgId}) Необходима авторизация!`);
      return;
    }
    // form should be valid here...
    const post: IPost = {
      title: this.postData.header,
      body: this.postData.body,
      bodyPreview: this.postData.bodyPreview,
      timestamp: Date.now(),
      userId: this.userService.currentUser.id,
      views: 0
    }

    this.postService.create(post).subscribe(
      (post) => {
        if (post) {
          this.notifyService.send(`(${++this.formMsgId}) Запись добавлена!`, Status.Success);
          this.postData.body = '';
          this.postData.header = '';
          this.postData.bodyPreview = '';
        } else {
          this.notifyService.send(`(${++this.formMsgId}) Что-то пошло не так`, Status.Success);
        }
      }
    );
  }
}
