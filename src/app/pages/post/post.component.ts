import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, IPost, IPostExtended } from 'src/app/shared/models';
import { CommentService, PostService, UserService } from 'src/app/shared/services';
import { UserRole } from 'src/app/shared/types';
import { CurrentUser } from './post.types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  public isLoaded = false;
  public postId!: number;
  public currentUser: CurrentUser = { id: -1, isAdmin: false };

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
          (post: IPostExtended) => {
            if (post) 
              this.isLoaded = true;
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

}
