import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'src/app/models/message';
import { MessageDto } from 'src/app/models/messageDto';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent {
  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];
  messageInput: string = "";
  messageTooBig: boolean = false;

  constructor (private cookieService: CookieService) { }

  sendMessage() {
    /*if (this.messageInput != "") {
      const newMessage = new MessageDto();
      newMessage.content = this.messageInput;
      newMessage.login = this.cookieService.get("email");
      this.messageInput = "";

      this.messages = [newMessage].concat(this.messages);
      this.messagesChange.emit(this.messages);
    }*/
  }

  checkMessageSize() {
    if (this.messageInput.length > 1000) {
      this.messageTooBig = true;
    } else {
      this.messageTooBig = false;
    }
  }
}
