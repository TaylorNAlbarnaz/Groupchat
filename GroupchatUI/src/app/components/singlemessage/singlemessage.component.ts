import { Component, Input } from '@angular/core';

@Component({
  selector: 'single-message',
  templateUrl: './singlemessage.component.html'
})
export class SingleMessageComponent {
  @Input() left: boolean = false;
  @Input() content: string = "";
}
