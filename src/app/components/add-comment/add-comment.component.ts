import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentUser } from 'src/app/pages/post/post.types';
import { IComment } from 'src/app/shared/models';
import { CommentService, NotificationService, PostService } from 'src/app/shared/services';
import { Status } from 'src/app/shared/types';


// Refers to the PostModule

@Component({
  selector: 'post-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  @Input({ required: true }) dataCurrentUser!: CurrentUser;
  @Input({ required: true }) dataPostId!: number;
  @Input() dataReplyTo?: number; 
  @Output() create: EventEmitter<IComment>; // OnCreate event

  public commentBody?: string;

  constructor( 
    private commentService: CommentService,
    private notifyService: NotificationService,
    private postService: PostService
  ) {
    this.create = new EventEmitter();
  }

  public add(): void {
    if (!this.commentBody)
      return;
    const comment: IComment = {
      body: this.commentBody.trim(),
      postId: this.dataPostId,
      timestamp: Date.now(),
      userId: this.dataCurrentUser.id,
      isRoot: true
    }
    if (this.dataReplyTo) {
      comment.replyTo = this.dataReplyTo;
      comment.isRoot = false;
    }

    this.commentService.create(comment).subscribe(
      (response: IComment) => {
        if (response) {
          this.commentBody = "";
          this.notifyService.send("Комментарий добавлен", Status.Success);
          if (!response.replyTo) {
            this.postService.lastPost?.comments.push(response);  // (!)
          }
          this.create.emit(response);
        } else {
          this.notifyService.send("Что-то пошло не так");
        }
      }
    );
  }

  public onSendShortcutPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.code == "Enter") {
      this.add();
    }
  }

}
