import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/shared/models';
import { PostService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public posts: IPost[] = [];

  constructor( public postService: PostService, private router: Router ) {}

  public ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => this.posts = posts);
  }

  public toPost(postId: number) {
    this.router.navigate([`/post/${postId}`]);
  }

}
