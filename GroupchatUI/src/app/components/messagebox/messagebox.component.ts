import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from 'src/app/models/loginDto';
import { Message } from 'src/app/models/message';
import { MessageDto } from 'src/app/models/messageDto';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html'
})
export class MessageboxComponent {
  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];

  @Output() messageQntChange: EventEmitter<any> = new EventEmitter();
  @Input() messageQnt: number = 10;

  @Output() currentGroupIdChange: EventEmitter<any> = new EventEmitter();
  @Input() currentGroupId: number = -1;

  messageInput: string = "";
  messageTooBig: boolean = false;

  constructor (private cookieService: CookieService, private messageService: MessageService, private userService: UserService) { }

  sendMessage() {
    if (this.messageInput != "") {
      const newMessage = new MessageDto();
      newMessage.content = this.messageInput;
      newMessage.userId = parseInt(this.cookieService.get("userId"));
      this.messageInput = "";

      const loginDto = new LoginDto();
      loginDto.email = this.cookieService.get("email");
      loginDto.password = this.cookieService.get("password");

      if (this.currentGroupId != -1) {
        this.messageService.sendMessage(this.currentGroupId, newMessage).subscribe();
        this.userService.getUser(newMessage.userId, loginDto). subscribe({
          next: (res)=> {
            const dbMessage = new Message();
            dbMessage.user = res;
            dbMessage.content = newMessage.content;

            this.messages = [dbMessage].concat(this.messages);
            this.messagesChange.emit(this.messages);
            
            this.messageQnt += 1;
            this.messageQntChange.emit(this.messageQnt);
          }
        });
      }
    }
  }

  checkMessageSize() {
    if (this.messageInput.length > 1000) {
      this.messageTooBig = true;
    } else {
      this.messageTooBig = false;
    }
  }
}
