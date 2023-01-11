import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  screen: number = 0;

  constructor(private cookieService: CookieService, private router: Router) { }

  close() {
    this.screen = 0;
    
    this.show = false;
    this.showChange.emit(this.show);
  }

  logoff() {
    this.cookieService.delete("email");
    this.cookieService.delete("password");

    this.router.navigate(['/auth']);
  }
}
