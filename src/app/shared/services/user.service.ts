import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { IUser } from '../models';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000";
  private user?: IUser;
  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) { }

  get currentUser(): IUser | undefined {
    let userId = window.sessionStorage.getItem('userId')
    if (userId && !this.user) {
      this.getById(userId).subscribe(
        (user) => this.user = user
      );
    }
    return this.user;
  }

  get currentUser$(): Observable<IUser | null> {
    let userId = window.sessionStorage.getItem('userId')
    if (!userId)
      return of(null);
    if (userId && (this.user?.id !== Number(userId))) {
      return this.getById(userId).pipe(
        map(
          (user) => {
            this.user = user;
            return user;
          }
        )
      );
    }
    return of(this.user!);
  }

  get isLoggedIn(): boolean {
    return window.sessionStorage.getItem('userId') ? true : false;
  }

  public getByName(login: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({
        fromObject: { name: login }
      })
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { email: email } })
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getById(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(this.url + '/users/' + id).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { email: email } })
    }).pipe(
      catchError(this.handleError.bind(this)),
      map((user) => user.length > 0 ? true : false)
    );
  }

  public checkUsername(username: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.url+'/users', {
      params: new HttpParams({ fromObject: { name: username } })
    }).pipe(
      catchError(this.handleError.bind(this)),
      map((user) => user.length > 0 ? true : false)
    );
  }

  public create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url+'/users', user).pipe(
      catchError(this.handleError.bind(this)),
      tap((user) => {
        if (user)
          this.user = user;
      })
    );
  }

  public updatePassword(user: IUser, newPassword: string): Observable<IUser> {
    user.password = newPassword;
    return this.http.put<IUser>(`${this.url}/users/${user.id}`, user).pipe(
      catchError(this.handleError.bind(this))
    );
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
    if (user.role >= 10)
      return "Администратор";
    return "Супермен";
  }

  private handleError(error: HttpErrorResponse) {
    this.notifyService.send('[User] Проблема с подключением к серверу. Status: ' + error.statusText);
    return throwError(() => error)
  }
}
