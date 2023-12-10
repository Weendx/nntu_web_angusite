import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, Status } from '../types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public message$ = new Subject<string>();
  public status$ = new Subject<Status>();

  private queue: Notification[] = [];
  private timeoutId: number = 0;
  private isShowing = false;

  private debounceTime = 1200;

  constructor() { }

  public send(msg: string, status: Status = Status.Error, duration: number = 1500) {
    console.log('notification.send', msg, status, duration);
    if (this.isShowing === false) {
      this.message$.next(msg);
      this.status$.next(status);
      this.isShowing = true;

      this.timeoutId = window.setTimeout(() => this.continue(), duration);
    } else {
      this.queue.push({message: msg, status: status, duration: duration})
    }
  }

  public continue() {
    if (this.isShowing === false)
      return;
    this.message$.next('');
    this.status$.next(Status.None);
    this.isShowing = false;
    setTimeout(() => {
      if (this.queue.length !== 0) {
        const obj = this.queue.shift() as Notification;
        this.send(obj.message, obj.status, obj.duration);
      }
    }, this.debounceTime);
  }

  public clear() {
    if (this.isShowing === false)
      return;
    this.message$.next('');
    this.status$.next(Status.None);
    this.isShowing = false;
    if (this.queue.length !== 0) {
      this.queue.length = 0;
    }
  }
}
