import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  logged: boolean = false;
  settings: boolean = false;

  constructor(private router: Router) {}

  openSettings() {
    this.settings = true;
  }

  ngOnInit() {
    if (!this.logged) {
      this.router.navigate(['/auth'])
    }
  }
}
