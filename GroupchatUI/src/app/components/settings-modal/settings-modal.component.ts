import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from 'src/app/models/loginDto';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html'
})
export class SettingsModalComponent {
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Input() show: boolean;

  @Output() loggedUserChange: EventEmitter<any> = new EventEmitter();
  @Input() loggedUser: string;

  screen: number = 0;

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("newPassword")
    const repeatPassword = control.get("repeatPassword")

    return password?.value === repeatPassword?.value ? null : { notmached: true };
  }

  usernameForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  })

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  }, { validators: this.passwordMatchingValidator});

  constructor(private cookieService: CookieService, private userService: UserService,private router: Router) { }

  close() {
    this.screen = 0;
    
    this.show = false;
    this.showChange.emit(this.show);

    this.usernameForm.setValue({username: ''});
    this.passwordForm.setValue({oldPassword: '', newPassword: '', repeatPassword: ''});
  }

  logoff() {
    this.cookieService.delete("email");
    this.cookieService.delete("password");

    this.router.navigate(['/auth']);
  }

  deleteUser() {
    const id: number = parseInt(this.cookieService.get('userId'));

    const login = new LoginDto();
    login.email = this.cookieService.get("email");
    login.password = this.cookieService.get("password");

    this.userService.deleteUser(id, login).subscribe({
      next: () => this.logoff(),
      error: () => {
        this.screen = 6;
      }
    })
  }

  onChangeCredentials(type: number) {
    const id: number = parseInt(this.cookieService.get('userId'));
    let user: User = new User();

    const login = new LoginDto();
    login.email = this.cookieService.get("email");
    login.password = this.cookieService.get("password");

    this.userService.getUser(id, login).subscribe({
      next: (result) => {
        if (type === 1) {
          const newUsername = this.usernameForm.value.username;
          user = result;

          const dbUser = new UserDto();
          dbUser.id = user.id;
          dbUser.username = newUsername as string;
          dbUser.email = user.login.email;
          dbUser.password = user.login.password;

          this.userService.updateUser(dbUser).subscribe({
            next: () => {
              this.screen = 4;
              this.loggedUser = newUsername as string;
              this.loggedUserChange.emit(this.loggedUser);
            },
            error: () => {
              this.screen = 6;
            }
          })
        }
        if (type === 2) {
          const newPassword = this.passwordForm.value.newPassword;
          user = result;

          const dbUser = new UserDto();
          dbUser.id = user.id;
          dbUser.username = user.username;
          dbUser.email = user.login.email;
          dbUser.password = newPassword as string;

          if (this.passwordForm.value.oldPassword != login.password) {
            this.screen = 6;
            return;
          }

          this.userService.updateUser(dbUser).subscribe({
            next: () => {
              this.screen = 5;
              this.cookieService.set("password", newPassword as string)
            },
            error: () => {
              this.screen = 6;
            }
          })
        }
      },
      error: () => {
        this.screen = 6;
      }
    })
  }
}
