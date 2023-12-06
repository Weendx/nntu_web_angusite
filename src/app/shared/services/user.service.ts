import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000";
  private user?: IUser;
  constructor(private http: HttpClient) { }

  get currentUser(): IUser | undefined {
    let userId = window.sessionStorage.getItem('userId')
    if (userId && !this.user) {
      this.getById(userId).subscribe();
    }
    return this.user;
  }

  public getByName(login: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({
        fromObject: { name: login }
      })
    }).pipe(
      tap((user) => {
        if (user.length > 0) 
          this.user = user[0];
      })
    );
  }

  public getById(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(this.url + '/users/' + id).pipe(
      tap((user) => this.user = user)
    )
  }

  public create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url+'/users', user);
  }

  public logout() {
    window.sessionStorage.clear();
    delete this.user;    
  }
}
