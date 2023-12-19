import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost, IPostExtended } from 'src/app/shared/models';
import { PostService, UserService } from 'src/app/shared/services';
import { UserRole } from 'src/app/shared/types';
import { CurrentUser, UpdatedPostData } from './post.types';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type PostState = "normal" | "editing";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  
  public isLoaded = false;
  public notFound = false;
  public postId!: number;
  public currentUser: CurrentUser = { id: -1, isAdmin: false };
  public currentState: PostState = "normal";

  private viewsTimeoutId = -1;
  private postReadTimeout = 5000;  // Время чтения поста для +1 к просмотру

  constructor( 
    public postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute 
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.postId = params.id;
        this.postService.getExtendedById(this.postId).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.notFound = true;
            }
            return throwError(() => error);
          })
        ).subscribe(
          // результаты запроса сохраняются в сервисе
          (post: IPostExtended) => {
            if (post) {
              this.isLoaded = true;
              this.viewsTimeoutId = window.setTimeout(() => {
                this.increaseViews();
                this.viewsTimeoutId = -1;
              }, this.postReadTimeout)
            }
          }
        );
      }
    );
    this.userService.currentUser$.subscribe(
      (user) => {
        if (!user) return;
        this.currentUser.id = user.id!;
        this.currentUser.isAdmin = user.role === UserRole.Admin;
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.viewsTimeoutId !== -1) {
      window.clearTimeout(this.viewsTimeoutId);
    }
  }

  public increaseViews(): void {
    if (this.postService.lastPost) {
      this.postService.update(Number(this.postId), {
        views: this.postService.lastPost.views + 1
      }).subscribe();
    }
  }

  public onEdit(): void {
    this.currentState = "editing";
  }

  public onEditStop(): void {
    this.currentState = "normal";
  }

  public onEditSave(updated: UpdatedPostData | undefined): void {
    if (updated) {
      this.postService.lastPost = {...this.postService.lastPost!, ...updated};
    }
    this.onEditStop();
  }

  public onDelete(): void {
    if (!window.confirm("Вы точно хотите удалить эту запись?")) {
      return;
    }
    this.postService.delete(Number(this.postId)).subscribe(
      () => {
        this.isLoaded = false;
        this.notFound = true;
      }
    );
  }

  public test() {
    console.log(`In test, isLoaded: ${this.isLoaded}, notFound: ${this.notFound}`);
  }

}
