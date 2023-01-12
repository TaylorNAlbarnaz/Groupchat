import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageDto } from 'src/app/models/messageDto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  settings: boolean = false;
  messages: MessageDto[];

  constructor(private cookieService: CookieService, private router: Router) {}

  openSettings() {
    this.settings = true;
  }

  ngOnInit() {
    if (this.cookieService.get("email") === "") {
      this.router.navigate(['/auth'])
    }
  }
}
