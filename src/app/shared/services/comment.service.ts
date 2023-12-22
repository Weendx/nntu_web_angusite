import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { IComment } from '../models';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:3000'

  constructor( private http: HttpClient, private notifyService: NotificationService ) { }

  public getById(id: number): Observable<IComment> {
    return this.http.get<IComment>(this.url + `/comments/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getReplies(parentId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.url + `/comments?replyTo=${parentId}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getFromPost(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.url + `/comments?postId=${postId}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public create(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.url + '/comments', comment).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public update(id: number, updatedComment: IComment): Observable<IComment> {
    return this.http.put<IComment>(this.url + `/comments/${id}`, updatedComment).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public delete(id: number): Observable<IComment | Object> {
    return this.getById(id).pipe(
      catchError(this.handleError.bind(this)),
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

  private handleError(error: HttpErrorResponse) {
    this.notifyService.send('[Comment] Проблема с подключением к серверу. Status: ' + error.statusText);
    return throwError(() => error)
  }
}
