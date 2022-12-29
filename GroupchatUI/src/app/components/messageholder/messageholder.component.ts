import { Component } from '@angular/core';

@Component({
  selector: 'message-holder',
  templateUrl: './messageholder.component.html',
  styles: ['.holder {overflow-y: scroll; -ms-overflow-style: none; scrollbar-width: none;}',
  '.holder::-webkit-scrollbar {display: none;}',
  '.bt-shadow {background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.6) 100%); transition: 0.3s;}']
})
export class MessageHolderComponent {
  shadowRef: Element | null;
  atBottom: boolean = true;
  atTop: boolean = false;

  loadedMessages: number = 20;
  messagesDb: string[] = Array.from(Array(100).keys()).map(n => n.toString().repeat(5));
  messages: string[] = this.messagesDb.slice(0, this.loadedMessages);

  ngAfterViewInit() {
    this.shadowRef = document.querySelector('.holder');
  }

  onScroll() {
    const scrollHeight = this.shadowRef?.scrollHeight as number;
    const divHeight = this.shadowRef?.clientHeight as number;

    this.atBottom = (this.shadowRef?.scrollTop == 0);
    this.atTop = (-(scrollHeight - divHeight) == this.shadowRef?.scrollTop);
  }

  resetScroll() {
    if (this.shadowRef && !this.atBottom) {
      this.shadowRef.scrollTop = 0;
    }
  }

  getLeft(n: string) {
    if (Number(n) % 2 === 0){
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
