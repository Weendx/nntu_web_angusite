import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, retry, tap } from 'rxjs';
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
      this.getById(userId).subscribe(
        (user) => this.user = user
      );
    }
    return this.user;
  }

  public getByName(login: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({
        fromObject: { name: login }
      })
    });
  }

  public getByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { email: email } })
    });
  }

  public getById(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(this.url + '/users/' + id);
  }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { email: email } })
    }).pipe(
      map((user) => user.length > 0 ? true : false)
    );
  }

  public checkUsername(username: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { name: username } })
    }).pipe(
      map((user) => user.length > 0 ? true : false)
    );
  }

  public create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url+'/users', user).pipe(
      tap((user) => {
        if (user)
          this.user = user;
      })
    );
  }

  public updatePassword(user: IUser, newPassword: string): Observable<IUser> {
    user.password = newPassword;
    return this.http.put<IUser>(`${this.url}/users/${user.id}`, user);
  }

  public logout() {
    window.sessionStorage.clear();
    delete this.user;    
  }

  public getRole(user: IUser): string {
    if (!user.role)
      return "Игрок";
    if (user.role >= 0 && user.role < 10)
      return "Игрок";
    if (user.role > 10)
      return "Администратор";
    return "Супермен";
  }
}
