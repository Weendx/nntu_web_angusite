import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService, UserService } from '../../services';
import { IUser } from '../../models';
import { equalToValidator, valueExistsValidator } from '../../validators';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from '../../types';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  public form!: FormGroup;
  public classes: {[key: string]: string[]} = {
    'rulesCheck': [],
    'captchaCheck': []
  };
  public isFormSubmitted = false;
  public isRegistered = false;

  constructor( 
    public userService: UserService,
    private notifyService: NotificationService
  ) {}

  public ngOnInit(): void {
    const emailRegexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    this.form = new FormGroup({
      username: new FormControl<string>('', 
        [ Validators.required, Validators.minLength(3) ], 
        valueExistsValidator((val) => this.userService.checkUsername(val))
      ),
      password: new FormControl<string>('', [
        Validators.required, Validators.minLength(8)
      ]),
      passwordRepeat: new FormControl<string>('', [
        Validators.required, equalToValidator('password')
      ]),
      email: new FormControl<string>('', 
        [ Validators.required, Validators.pattern(emailRegexp) ],
        valueExistsValidator((val) => this.userService.checkEmail(val))
      ),
      question: new FormControl<string>('', [
        Validators.required
      ]),
      answer: new FormControl<string>('', [ 
        Validators.required 
      ]),
      rulesCheck: new FormControl<boolean>(false, [
        Validators.requiredTrue
      ]),
      captchaCheck: new FormControl<boolean>(false, [
        Validators.requiredTrue
      ])
    })
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordRepeat(): FormControl {
    return this.form.get('passwordRepeat') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get question(): FormControl {
    return this.form.get('question') as FormControl;
  }

  get answer(): FormControl {
    return this.form.get('answer') as FormControl;
  }

  get rulesCheck(): FormControl {
    return this.form.get('rulesCheck') as FormControl;
  }

  get captchaCheck(): FormControl {
    return this.form.get('captchaCheck') as FormControl;
  }

  public submit(): void {
    this.isFormSubmitted = true;
    if (this.rulesCheck.hasError('required')) {
      this.classes.rulesCheck.push('invalid');
      setTimeout(() => {
        this.classes.rulesCheck.pop();
      }, 600);
    }
    if (this.captchaCheck.hasError('required')) {
      this.classes.captchaCheck.push('invalid');
      setTimeout(() => {
        this.classes.captchaCheck.pop();
      }, 600);
    }
    console.log(this.form, this.classes);
    if (this.form.invalid) {
      console.log('form invalid');
      this.notifyService.send('Проверьте правильность заполнения полей формы', Status.Error, 3000);
      return;
    }
    // form should be valid here...
    const user: IUser = {
      name: this.username.value,
      email: this.email.value,
      ava: "https://api.dicebear.com/7.x/initials/svg?seed="+encodeURI(this.username.value),
      role: 0,
      balance: 0,
      password: this.password.value,
      controlQuestion: this.question.value,
      controlAnswer: this.answer.value
    };

    this.userService.create(user).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifyService.send('Проблема с подключением к серверу');
        return throwError(() => error.message);
      })
    ).subscribe((user) => {
      console.log(user);
      if (!user) {
        this.notifyService.send('Ошибка при создании учетной записи, обратитесь к администрации', Status.Error, 3000);
        return;
      }
      window.sessionStorage.setItem('userId', String(user.id));
      this.isRegistered = true;
      this.form.reset();
      this.isFormSubmitted = false;
    });
  }

}

