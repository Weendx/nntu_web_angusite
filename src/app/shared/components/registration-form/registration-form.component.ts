import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


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

  get rulesCheck(): FormControl {
    return this.form.get('rulesCheck') as FormControl;
  }

  get captchaCheck(): FormControl {
    return this.form.get('captchaCheck') as FormControl;
  }

  public submit(): void {
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
    }
  }
}

