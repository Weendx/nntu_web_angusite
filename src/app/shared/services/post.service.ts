import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) {}

  public getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url+'/posts?_sort=timestamp&_order=desc');
  }

  public getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.url+`/posts/${id}`);
  }

  public create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.url+'/posts', post);
  }

}
