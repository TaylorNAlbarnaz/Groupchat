import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-message',
  templateUrl: './singlemessage.component.html'
})
export class SingleMessageComponent {
  @Input() client = false;
  @Input() content = "";
  @Input() name = "";
}
