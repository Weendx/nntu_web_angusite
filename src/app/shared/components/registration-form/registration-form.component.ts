import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';


const checkIsPasswordsEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.parent?.get('password');
  const passwordRepeat = control.parent?.get('passwordRepeat');
  if (password == null || passwordRepeat == null)
    return null;
  if (password.value !== passwordRepeat.value)
    return { equalTo: true }
  return null
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  public form!: FormGroup;
  public classes: {[key: string]: string[]} = {
    'rulesCheck': [],
    'captchaCheck': [],
    'formErrorMsg': ['signup_hide']
  };
  public formErrorMessage: string = '';
  public isFormSubmitted = false;
  public isRegistered = false;

  constructor( public userService: UserService ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl<string>('', [
        Validators.required, Validators.minLength(3)
      ]),
      password: new FormControl<string>('', [
        Validators.required, Validators.minLength(8)
      ]),
      passwordRepeat: new FormControl<string>('', [
        Validators.required, checkIsPasswordsEqual
      ]),
      email: new FormControl<string>('', [
        Validators.required, Validators.email
      ]),
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
      this.formErrorMessage = 'Проверьте правильность заполнения полей формы';
      this.classes.formErrorMsg.pop();
      setTimeout(() => this.classes.formErrorMsg.push('signup_hide'), 3500);
      setTimeout(() => this.formErrorMessage = '', 4000);
      return;
    }
    // form should be valid here...
    const user: IUser = {
      name: this.username.value,
      email: this.email.value,
      ava: "https://api.dicebear.com/7.x/initials/svg?seed="+encodeURI(this.username.value),
      balance: 0,
      password: this.password.value,
      controlQuestion: this.getQuestionByKey(this.question.value),
      controlAnswer: this.answer.value
    };

    this.userService.create(user).subscribe((user) => {
      console.log(user);
      window.sessionStorage.setItem('userId', String(user.id));
      this.isRegistered = true;
      this.form.reset();
    });
  }

  public getQuestionByKey(key: string): string {
    const questions: {[key: string]: string} = {
      "q1-mailindex": "Почтовый индекс ваших родителей",
      "q2-maidenname": "Девичья фамилия матери",
      "q3-carmodel": "Модель вашей первой машины",
      "q4-author": "Любимый писатель",
      "q5-petname": "Кличка домашнего животного",
      "q6-profession": "Профессия вашего дедушки",
      "q7-favdish": "Любимое блюдо"
    }
    return questions[key];
  }
}

