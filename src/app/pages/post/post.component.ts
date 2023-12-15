import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPostExtended } from 'src/app/shared/models';
import { PostService, UserService } from 'src/app/shared/services';
import { UserRole } from 'src/app/shared/types';
import { CurrentUser } from './post.types';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  
  public isLoaded = false;
  public postId!: number;
  public currentUser: CurrentUser = { id: -1, isAdmin: false };

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
        this.postService.getExtendedById(this.postId).subscribe(
          // результаты запроса сохраняются в сервисе
          (post: IPostExtended) => {
            if (post) 
              this.isLoaded = true;
            this.viewsTimeoutId = window.setTimeout(() => {
              this.increaseViews();
              this.viewsTimeoutId = -1;
            }, this.postReadTimeout)
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

}
