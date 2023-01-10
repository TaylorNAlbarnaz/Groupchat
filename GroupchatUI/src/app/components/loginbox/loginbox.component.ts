import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loginbox',
  templateUrl: './loginbox.component.html',
  styleUrls: ['./loginbox.component.css']
})
export class LoginboxComponent {
  @Input() register: boolean = false;
}
