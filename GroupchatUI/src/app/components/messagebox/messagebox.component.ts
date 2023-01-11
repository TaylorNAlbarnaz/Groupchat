import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent {
  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: string[];
  messageInput: string = "";

  sendMessage() {
    if (this.messageInput != "") {
      const messageValue = [this.messageInput]
      this.messages = messageValue.concat(this.messages);
      this.messagesChange.emit(this.messages);
    }
  }
}
