import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatedPostData } from 'src/app/pages/post/post.types';
import { IPost } from 'src/app/shared/models';
import { NotificationService, PostService } from 'src/app/shared/services';
import { Status } from 'src/app/shared/types';


@Component({
  selector: 'post-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input({required: true}) dataPostInfo!: IPost;
  @Output() edited: EventEmitter<UpdatedPostData> = new EventEmitter<UpdatedPostData>();

  public postData: UpdatedPostData = {
    title: '',
    bodyPreview: '',
    body: ''
  }
  
  constructor( 
    private postService: PostService,
    private notifyService: NotificationService  
  ) {  }

  public ngOnInit(): void {
    this.postData.title = this.dataPostInfo.title;
    this.postData.body = this.dataPostInfo.body;
    this.postData.bodyPreview = this.dataPostInfo.bodyPreview;
  }

  public editPost(): void {
    this.postService.update(this.dataPostInfo.id!, this.postData).subscribe(
      (post) => {
        if (post && post.bodyPreview === this.postData.bodyPreview) {
          this.notifyService.send("Запись изменена", Status.Success);
          this.edited.emit(this.postData);
        } else {
          this.notifyService.send("Что-то пошло не так", Status.Error);
          this.edited.emit();
        }
      }
    );
  }

  public cancelEdit(): void {
    this.edited.emit();
  }

}
