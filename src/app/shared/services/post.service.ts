import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/post';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000';

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

  public create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.url+'/posts', post).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('[Post] Проблема с подключением к серверу. ' + error.message);
        return throwError(() => error.message);
      })
    );
  }

}
