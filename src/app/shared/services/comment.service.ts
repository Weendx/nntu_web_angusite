import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { IComment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:3000'

  constructor( private http: HttpClient ) { }

  public getById(id: number): Observable<IComment> {
    return this.http.get<IComment>(this.url + `/comments/${id}`);
  }

  public getReplies(parentId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.url + `/comments?replyTo=${parentId}`);
  }

  public getFromPost(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.url + `/comments?postId=${postId}`);
  }

  public create(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.url + '/comments', comment);
  }

  public update(id: number, updatedComment: IComment): Observable<IComment> {
    return this.http.put<IComment>(this.url + `/comments/${id}`, updatedComment);
  }

  public delete(id: number): Observable<IComment | Object> {
    return this.getById(id).pipe(
      mergeMap((comment: IComment) => {
        const patch = {
          isDeleted: true,
          body: "<deleted>"
        };
        if (comment.isRoot)
          return this.http.patch<IComment>(this.url + `/comments/${id}`, patch);
        else
          return this.http.delete(this.url + `/comments/${id}`);
      })
    ); 
  }

  public transformToDeleted(comment: IComment): IComment {
    const copy = structuredClone(comment);
    copy.isDeleted = true;
    copy.body = "<deleted>";
    return copy;
  }
}
