import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CurrentUser } from 'src/app/pages/post/post.types';
import { IComment } from 'src/app/shared/models';
import { CommentService } from 'src/app/shared/services';


@Component({
  selector: 'post-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {
  
  @Input({ required: true }) dataComment!: IComment;
  @Input() dataCurrentUser?: CurrentUser;

  public replies: IComment[] = [];
  public isWantReply = false;

  constructor( private commentService: CommentService ) {}

  public ngOnInit(): void {
    this.commentService.getReplies(this.dataComment.id!).pipe(
      map((replies) => replies.filter((value: IComment) => value.replyTo ? true : false))
    ).subscribe(
      (replies: IComment[]) => { this.replies = replies }
    );
  }

  public onReplyClick() {
    this.isWantReply = !this.isWantReply;
  }

  public onReplyAdded(reply: IComment) {
    this.replies.push(reply);
    this.onReplyClick();
  }

  public onRootDelete(comment: IComment) {
    this.dataComment = this.commentService.transformToDeleted(comment);
  }

  public onReplyDelete(comment: IComment) {
    for (let i = 0; i < this.replies.length; i++) {
      if (this.replies[i].id === comment.id) {
        this.replies.splice(i, 1);
        break;
      }
    }
  }
  
}
