import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-loginbox',
  templateUrl: './loginbox.component.html',
  styleUrls: ['./loginbox.component.css']
})
export class LoginboxComponent {
  @Input() register: boolean = true;
  loginModel: Login;
  registerModel: Register;

  onSubmitLogin() {
    console.warn(this.loginForm.value);
  }

  onSubmitRegister() {
    console.warn(this.loginForm.value);
  }

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("registerPassword")
    const repeatPassword = control.get("registerRepeatPassword")

    return password?.value === repeatPassword?.value ? null : { notmached: true };
  }

  loginForm = new FormGroup({
    loginEmail: new FormControl('', Validators.required),
    loginPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  registerForm = new FormGroup({
    registerUsername: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    registerEmail: new FormControl('', [
      Validators.required
    ]),
    registerPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    registerRepeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  }, { validators: this.passwordMatchingValidator})
}
