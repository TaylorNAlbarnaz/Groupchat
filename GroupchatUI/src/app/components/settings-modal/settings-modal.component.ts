import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
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

  constructor(private cookieService: CookieService, private router: Router) { }

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
}
