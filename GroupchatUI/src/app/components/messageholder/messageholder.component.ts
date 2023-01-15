import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'src/app/models/message';
import { MessageDto } from 'src/app/models/messageDto';

@Component({
  selector: 'app-message-holder',
  templateUrl: './messageholder.component.html',
  styleUrls: ['./messageholder.component.css']
})
export class MessageHolderComponent implements AfterViewInit{
  shadowRef: Element | null;
  atBottom = true;
  atTop = false;

  loadedMessages = 20;
  messagesDb: string[] = Array.from(Array(50).keys()).map(n => n.toString().repeat(100));

  loggedUser: number;

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.loggedUser = parseInt(this.cookieService.get("userId"));
  }

  ngAfterViewInit() {
    this.shadowRef = document.querySelector('.holder');
  }

  onScroll() {
    const scrollHeight = this.shadowRef?.scrollHeight as number;
    const scrollTop = this.shadowRef?.scrollTop as number;
    const divHeight = this.shadowRef?.clientHeight as number;

    this.atBottom = (scrollTop > -200);
    this.atTop = (-(scrollHeight - divHeight) >= scrollTop - 50);
  }

  resetScroll() {
    if (this.shadowRef && !this.atBottom) {
      this.shadowRef.scrollTop = 0;
    }
  }

  getClient(message: Message) {
    if (message.user != null) {
      if (message.user.id === this.loggedUser){
        return true;
      }
    }
    return false;
  }

  loadMoreMessages() {
    const messagesToAdd: string[] = this.messagesDb.slice(this.loadedMessages, this.loadedMessages + 20);
    let messageList: Message[] = [];

    for (let i = 0; i < messagesToAdd.length; i ++) {
      const newMessage = new Message();
      newMessage.content = messagesToAdd[i];

      messageList = messageList.concat(newMessage);
    }
    this.messages = this.messages.concat(messageList);

    this.loadedMessages += messagesToAdd.length;
    this.atTop = false;
  }
}
