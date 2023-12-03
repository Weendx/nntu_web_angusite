import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

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
  }
}
