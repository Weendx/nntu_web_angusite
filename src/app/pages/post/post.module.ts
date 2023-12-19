import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { AddCommentComponent } from 'src/app/components/add-comment/add-comment.component';
import { CommentThreadComponent } from 'src/app/components/comment-thread/comment-thread.component';
import { FormsModule } from '@angular/forms';
import { EditPostComponent } from 'src/app/components/edit-post/edit-post.component';


const routes: Routes = [
  {path: '', component: PostComponent}
]

@NgModule({
  declarations: [
    PostComponent,
    CommentComponent,
    AddCommentComponent,
    CommentThreadComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PostModule { }
