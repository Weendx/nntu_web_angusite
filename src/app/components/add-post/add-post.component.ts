import { Component } from '@angular/core';
import { IPost } from 'src/app/shared/models';
import { PostService, UserService } from 'src/app/shared/services';

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
  
  constructor(private postService: PostService, private userService: UserService) {}

  public addPost() {
    console.log(this.postData);
    if (!this.postData.body || !this.postData.bodyPreview || !this.postData.header) {
      this.postData.formMsg = 'Заполните все поля';
      this.postData.formMsgId++;
      return;
    }
    if (!this.userService.isLoggedIn || !this.userService.currentUser?.id) {
      this.postData.formMsg = 'Необходима авторизация';
      this.postData.formMsgId++;
      return;
    }
    // form should be valid here...
    const post: IPost = {
      title: this.postData.header,
      body: this.postData.body,
      bodyPreview: this.postData.bodyPreview,
      timestamp: Math.floor(Date.now() / 1000),
      userId: this.userService.currentUser.id,
      views: 0
    }

    this.postService.create(post).subscribe(
      (post) => {
        if (post) {
          this.postData.formMsg = 'Запись добавлена';
          this.postData.formMsgId += 1;
          this.postData.body = '';
          this.postData.header = '';
          this.postData.bodyPreview = '';
        } else {
          this.postData.formMsg = 'Что-то пошло не так';
          this.postData.formMsgId++;
        }
      }
    );
  }
}
