import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


const isPasswordsEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.parent?.get('newPassword');
  const passwordRepeat = control.parent?.get('newPasswordRepeat');
  if (password == null || passwordRepeat == null)
    return null;
  if (password.value !== passwordRepeat.value)
    return { equalTo: true }
  return null
}

@Component({
  selector: 'app-chngpass-form',
  templateUrl: './chngpass-form.component.html',
  styleUrls: ['./chngpass-form.component.css']
})
export class ChngpassFormComponent implements OnInit {

  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      newPassword: new FormControl<string>('', [ Validators.required ]),
      newPasswordRepeat: new FormControl<string>('', [ Validators.required, isPasswordsEqual ]),
      answer: new FormControl<string>('', [ Validators.required ])
    });
  }

  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl
  }

  get newPasswordRepeat(): FormControl {
    return this.form.get('newPasswordRepeat') as FormControl
  }

  get answer(): FormControl {
    return this.form.get('answer') as FormControl
  }

  public submit(): void {
    console.log(this.form);
    
  }
}
