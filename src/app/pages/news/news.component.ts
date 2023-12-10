import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public newsFilter = '';
  public posts!: IPost[];

  constructor( public postService: PostService, private router: Router ) {}

  public ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => this.posts = posts);
  }

  public clearFilter() {
    this.newsFilter = '';
  }

  public toPost(postId: number) {
    this.router.navigate([`/post/${postId}`]);
  }
}
