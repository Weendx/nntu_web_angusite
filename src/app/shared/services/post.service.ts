import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IPostExtended, IPostOptional } from '../models';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { Status } from '../types';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000';
  private _lastPost?: IPostExtended;

  get lastPost(): IPostExtended | undefined {
    return this._lastPost;
  }

  set lastPost(updatedPost: IPostExtended) {
    this._lastPost = updatedPost;
  }

  constructor( 
    private http: HttpClient, 
    private notifyService: NotificationService
  ) {}

  public getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url+'/posts?_sort=timestamp&_order=desc').pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.url+`/posts/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getExtendedById(id: number): Observable<IPostExtended> {
    return this.http.get<IPostExtended>(this.url+`/posts/${id}?_embed=comments&_expand=user`).pipe(
      catchError(this.handleError.bind(this)),
      tap((post: IPostExtended) => this.lastPost = post)
    );
  }

  public create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.url+'/posts', post).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public update(id: number, changes: IPostOptional): Observable<IPost> {
    if (this.lastPost) {
      if (this.lastPost.id === id) {
        this.lastPost = {...this.lastPost, ...changes}
      }
    }
    return this.http.patch<IPost>(this.url + `/posts/${id}`, changes).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public delete(id: number) {
    return this.http.delete(this.url + `/posts/${id}`).pipe(
      catchError(this.handleError.bind(this)),
      tap((_) => {
        if (id === this.lastPost?.id) {
          delete this._lastPost;
        }        
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.notifyService.send('Запись не найдена');
    } else {
      this.notifyService.send('[Post] Проблема с подключением к серверу. Status: ' + error.statusText, Status.Error, 3000);
    }
    return throwError(() => error)
  }

}
