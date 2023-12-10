import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private state = 'state_hidden';
  private statusClass = 'status_none';
  private isShowing = false;
  private timeoutId = {msg: -1, status: -1};
  private animationTime = 1000;

  public message = '';

  constructor(public notifyService: NotificationService) {}

  public ngOnInit(): void {
    this.notifyService.message$.subscribe(
      (msg) => {
        if (msg) {
          this.isShowing = true;
          this.state = 'state_opening';
          this.message = msg;
          if (this.timeoutId.msg !== -1) {
            window.clearTimeout(this.timeoutId.msg);
          }
        } else {
          this.isShowing = false;
          this.state = 'state_preclosing';
          setTimeout(() => this.state = 'state_closing', 50);
          this.timeoutId.msg = window.setTimeout(() => {
            this.message = '';
            this.timeoutId.msg = -1;
          }, this.animationTime);
        }
      }
    );
    this.notifyService.status$.pipe(
    ).subscribe(
      (status) => {
          if (this.state === 'state_preclosing' || this.state === 'state_closing') {
            this.timeoutId.status = window.setTimeout(() => {
              this.statusClass = "status_" + status;
              this.timeoutId.status = -1;  
            }, this.animationTime);
          } else {
            if (this.timeoutId.status !== -1)
              window.clearTimeout(this.timeoutId.status);
            this.statusClass = "status_" + status
          }
      }
    )
  }

  @HostListener('animationend') moved(): void {
    if (this.isShowing === false)
      this.state = 'state_hidden';
  }

  @HostBinding('class') get elementClass(): string {
    return `${this.state} ${this.statusClass}`;
  }
}
