import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../../services';
import { IUser } from '../../models/user';
import { equalToValidator, valueExistsValidator } from '../../validators';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormMessage } from '../../common';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  public form!: FormGroup;
  public formMsg!: FormMessage;
  public classes: {[key: string]: string[]} = {
    'rulesCheck': [],
    'captchaCheck': []
  };
  public isFormSubmitted = false;
  public isRegistered = false;

  constructor( public userService: UserService ) {}

  public ngOnInit(): void {
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
        [ Validators.required, Validators.email ],
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
    this.formMsg = new FormMessage(4000);
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
      this.formMsg.show('Проверьте правильность заполнения полей формы');
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
        this.formMsg.show('Проблема с подключением к серверу');
        return throwError(() => error.message);
      })
    ).subscribe((user) => {
      console.log(user);
      if (!user) {
        this.formMsg.show('Ошибка при создании учетной записи, обратитесь к администрации');
        return;
      }
      window.sessionStorage.setItem('userId', String(user.id));
      this.isRegistered = true;
      this.form.reset();
      this.isFormSubmitted = false;
    });
  }

}

