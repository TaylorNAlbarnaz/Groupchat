import { AfterViewInit, Component } from '@angular/core';

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
  messagesDb: string[] = Array.from(Array(200).keys()).map(n => n.toString().repeat(150));
  messages: string[] = this.messagesDb.slice(0, this.loadedMessages);

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

  getLeft(n: number) {
    if (n % 2 === 0){
      return true;
    }
    return false;
  }

  loadMoreMessages() {
    const messagesToAdd: string[] = this.messagesDb.slice(this.loadedMessages, this.loadedMessages + 20);
    this.messages = this.messages.concat(messagesToAdd);

    this.loadedMessages += messagesToAdd.length;
    this.atTop = false;
  }
}
