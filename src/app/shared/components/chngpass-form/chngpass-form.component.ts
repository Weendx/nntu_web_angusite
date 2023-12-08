import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { equalToValidator } from '../../validators';
import { UserService } from '../../services/user.service';

class FormMessage {
  private _text?: string;
  private _status?: string;
  public hidden = true;

  constructor(private timeout: number) {}

  set text(msg: string) {
    this._text = msg;
    this.hidden = false;
    setInterval(() => this.hidden = true, this.timeout);
    setInterval(() => this._text = '', this.timeout + 500);
  }
  get text(): string {
    return this._text ? this._text : '';
  }
  set status(msgType: string) {
    this._status = msgType;
  }
  get status(): string {
    return this._status ? this._status : '';
  }

  public show(msg: string, status?: string) {
    this.text = msg;
    this.status = String(status);
  }
}

@Component({
  selector: 'app-chngpass-form',
  templateUrl: './chngpass-form.component.html',
  styleUrls: ['./chngpass-form.component.css']
})
export class ChngpassFormComponent implements OnInit {

  public form!: FormGroup;
  public formMsg!: FormMessage;
  public isFormSubmitted = false;

  constructor( private userService: UserService ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl<string>('', [ Validators.required ]),
      newPassword: new FormControl<string>('', [ 
        Validators.required,  Validators.minLength(8)
      ]),
      newPasswordRepeat: new FormControl<string>('', [ 
        Validators.required, equalToValidator('newPassword') 
      ]),
      question: new FormControl<string>('', [ Validators.required ]),
      answer: new FormControl<string>('', [ Validators.required ])
    });
    this.formMsg = new FormMessage(5000);
  }

  get login(): FormControl {
    return this.form.get('login') as FormControl
  }

  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl
  }

  get newPasswordRepeat(): FormControl {
    return this.form.get('newPasswordRepeat') as FormControl
  }
  
  get question(): FormControl {
    return this.form.get('question') as FormControl
  }

  get answer(): FormControl {
    return this.form.get('answer') as FormControl
  }

  public submit(): void {
    this.isFormSubmitted = true;
    console.log(this.form);
    if (this.form.invalid)
      return;
    this.userService.getByName(this.login.value).subscribe(
      (user) => {
        if (user.length == 0 || user[0].controlQuestion !== this.question.value
                || user[0].controlAnswer !== this.answer.value) {
          this.formMsg.show('Ошибка в заполнении полей формы: неверные данные');
        } else {
          this.userService.updatePassword(user[0], this.newPassword.value);
          console.log(user[0]);
          this.formMsg.show("Пароль обновлён!", "success");
          this.form.reset();
          this.isFormSubmitted = false;
        }
      }
    );
  }
}
