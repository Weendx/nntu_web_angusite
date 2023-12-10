import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formMsg?: string | null;
  formMsgId = 0;

  constructor( public userService: UserService ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl<string>('', [ Validators.required ]),
      password: new FormControl<string>('', [ Validators.required ])
    });    
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
          this.formMsg = "Пользователь не найден";
          this.formMsgId += 1;
          return;
        }
        if (user[0].password !== this.form.value.password) {
          this.formMsg = "Проверьте правильность введенных данных";
          this.formMsgId += 1;
          return;
        }
        this.formMsg = "Успешный вход";
        this.formMsgId += 1;
        window.sessionStorage.setItem('userId', String(user[0].id));
      }
    );
  }

  public logout() {
    this.userService.logout();
    this.formMsg = '';
    this.formMsgId = 0;
    this.form.reset();
  }
}
