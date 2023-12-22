import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { equalToValidator } from '../../validators';
import { NotificationService, UserService } from '../../services';
import { Status } from '../../types';


@Component({
  selector: 'app-chngpass-form',
  templateUrl: './chngpass-form.component.html',
  styleUrls: ['./chngpass-form.component.css']
})
export class ChngpassFormComponent implements OnInit {

  public form!: FormGroup;
  public isFormSubmitted = false;

  constructor( 
    private userService: UserService,
    private notifyService: NotificationService
  ) {}

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
          this.notifyService.send('Ошибка в заполнении полей формы: неверные данные', Status.Error, 3000);
        } else {
          this.userService.updatePassword(user[0], this.newPassword.value).subscribe(
            (user) => {
              if (user.password === this.newPassword.value) {
                this.notifyService.send("Пароль обновлён!", Status.Success, 4000);
                this.form.reset();
                this.isFormSubmitted = false;
              } else {
                this.notifyService.send("Что-то пошло не так", Status.Error, 3000);
              }
            }
          );
          
        }
      }
    );
  }
}
