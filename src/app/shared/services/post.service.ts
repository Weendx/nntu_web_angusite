import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IPostExtended } from '../models';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000';

  public lastPost?: IPostExtended;

  constructor( private http: HttpClient, private notifyService: NotificationService ) {}

  public getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url+'/posts?_sort=timestamp&_order=desc').pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('[Post] Проблема с подключением к серверу. ' + error.message);
        return throwError(() => error.message);
      })
    );
  }

  public getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.url+`/posts/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('[Post] Проблема с подключением к серверу. ' + error.message);
        return throwError(() => error.message);
      })
    );
  }

  public getExtendedById(id: number): Observable<IPostExtended> {
    return this.http.get<IPostExtended>(this.url+`/posts/${id}?_embed=comments&_expand=user`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('[Post] Проблема с подключением к серверу. ' + error.message);
        return throwError(() => error.message);
      }),
      tap((post: IPostExtended) => this.lastPost = post)
    );
  }

  public create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.url+'/posts', post).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('[Post] Проблема с подключением к серверу. ' + error.message);
        return throwError(() => error.message);
      })
    );
  }

}
