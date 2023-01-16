import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/login';
import { LoginDto } from 'src/app/models/loginDto';
import { UserDto } from 'src/app/models/userDto';
import { Register } from 'src/app/models/register';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-loginbox',
  templateUrl: './loginbox.component.html',
  styleUrls: ['./loginbox.component.css']
})
export class LoginboxComponent {
  @Input() register: boolean = true;
  loginModel: Login;
  registerModel: Register;
  
  loginCreateSuccess: boolean = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';
  loading: boolean = false;

  onSubmitLogin() {
    this.loading = true;
    this.loginCreateSuccess = false;

    const email = this.loginForm.value.loginEmail as string;
    const password = this.loginForm.value.loginPassword as string;
    const rememberme = this.loginForm.value.loginRememberme as boolean;

    const loginDto = new LoginDto();
    loginDto.email = email;
    loginDto.password = password;

    this.loginService.login(loginDto).subscribe({
      next: (result) => {
        this.loginError = false;
        this.loading = false;

        if (rememberme) {
          this.cookieService.set('userId', ''+result.id)
          this.cookieService.set('email', result.email)
          this.cookieService.set('password', result.password)
        } else {
          this.cookieService.set('userId', ''+result.id, 30)
          this.cookieService.set('email', result.email, 30)
          this.cookieService.set('password', result.password, 30)
        }

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginErrorMessage = err.error;
        this.loginError = true;
        this.loading = false;
      }
    });
  }

  onSubmitRegister() {
    this.loading = true;

    const email = this.registerForm.value.registerEmail as string;
    const password = this.registerForm.value.registerPassword as string;
    const username = this.registerForm.value.registerUsername as string;

    const userDto = new UserDto();
    userDto.email = email;
    userDto.password = password;
    userDto.username = username;

    this.loginService.register(userDto).subscribe({
      next: () => {
        this.loginError = false;
        this.loading = false;

        this.register = false;
        this.loginCreateSuccess = true;
      },
      error: (err) => {
        this.loginErrorMessage = err.error;
        this.loginError = true;
        this.loading = false;
      }
    })

  }

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("registerPassword")
    const repeatPassword = control.get("registerRepeatPassword")

    return password?.value === repeatPassword?.value ? null : { notmached: true };
  }

  constructor (private cookieService: CookieService, private loginService: LoginService ,private router: Router) { }

  loginForm = new FormGroup({
    loginEmail: new FormControl('', Validators.required),
    loginPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    loginRememberme: new FormControl(false)
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
