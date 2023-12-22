import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService, UserService } from '../../services';
import { Status } from '../../types';
import { IUser } from '../../models';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formMsgId = 0;
  currentUser: IUser | null = null;

  constructor( 
    private userService: UserService,
    private notifyService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl<string>('', [ Validators.required ]),
      password: new FormControl<string>('', [ Validators.required ])
    });
    this.userService.currentUser$.subscribe(
      (user) => this.currentUser = user
    );
  }

  get login() {
    return this.form.get('login') as FormControl
  }

  get password() {
    return this.form.get('password') as FormControl
  }

  public submit() {
    console.log(this.form);
    if (this.form.invalid) return;
    this.userService.getByName(this.form.value.login).subscribe(
      (user) => {
        if (user.length == 0) {
          this.notifyService.send(`(${++this.formMsgId}) Пользователь не найден`);
          return;
        }
        if (user[0].password !== this.form.value.password) {
          this.notifyService.send(
            `(${++this.formMsgId}) Проверьте правильность введенных данных`, 
            Status.None, 3000
          );
          return;
        }
        window.sessionStorage.setItem('userId', String(user[0].id));
        this.notifyService.send("Успешный вход", Status.Success);
        this.currentUser = user[0];
      }
    );
  }

  public logout() {
    this.userService.logout();
    this.currentUser = null;
    this.formMsgId = 0;
    this.form.reset();
  }
}
