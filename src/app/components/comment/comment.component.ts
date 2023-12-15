import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUser } from 'src/app/pages/post/post.types';
import { IComment, IUser } from 'src/app/shared/models';
import { CommentService, NotificationService, PostService, UserService } from 'src/app/shared/services';
import { Status } from 'src/app/shared/types';


@Component({
  selector: 'post-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input({ required: true }) dataComment!: IComment;
  @Input() dataCurrentUser?: CurrentUser;
  @Input() dataHasReplies?: boolean;
  @Output() wantanswer!: EventEmitter<boolean>;
  @Output() deleted!: EventEmitter<IComment>;

  public isLoaded = false;
  public isEditing = false;
  public isWantAnswer = false;
  public user?: IUser;
  public editFields = {body: ""};

  constructor ( 
    private commentService: CommentService,
    private userService: UserService,
    private notifyService: NotificationService,
  ) {
    this.wantanswer = new EventEmitter();
    this.deleted = new EventEmitter();
  }

  public ngOnInit() {
    // не выполняем лишних запросов
    if (this.dataComment.isDeleted) {
      this.isLoaded = true;
      return;
    }

    this.userService.getById(this.dataComment.userId).subscribe(
      (user: IUser) => {
        this.user = user;
        this.isLoaded = true;
      }
    );
  }

  public edit() {
    this.isEditing = true;
    this.editFields.body = this.dataComment.body;
  }

  public stopEdit() {
    if (this.isEditing === false)
      return;
    const newComment: IComment = structuredClone(this.dataComment);
    newComment.body = this.editFields.body.trim();
    newComment.updateTimestamp = Date.now();
    this.commentService.update(this.dataComment.id!, newComment)
      .subscribe((updatedComment) => {
        if (updatedComment) {
          this.dataComment = updatedComment;  // potential bug
          this.isEditing = false;
          this.notifyService.send("Комментарий изменён", Status.Success);
        } else {
          this.notifyService.send("Что-то пошло не так");
        }
      });
  }

  public cancelEdit() {
    if (this.isEditing === false)
      return;
    this.isEditing = false;
  }

  public onDelete() {
    const copy = structuredClone(this.dataComment);
    this.commentService.delete(this.dataComment.id!).subscribe(
      (response: Object) => {
        if (response) {
          this.deleted.emit(copy);
          this.notifyService.send("Комментарий удалён", Status.Success);
        } else {  // Сработает ли этот случай когда-нибудь? 
          this.notifyService.send("Что-то пошло не так");
        }
      }
    );
  }

  public toggleAnswer() {
    this.isWantAnswer = !this.isWantAnswer;
    this.wantanswer.emit(this.isWantAnswer);
  }

}
