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

  ngAfterViewInit() {
    this.shadowRef = document.querySelector('.holder');
  }

  onScroll() {
    this.atBottom = (this.shadowRef?.scrollTop == 0);
  }

  resetScroll() {
    if (this.shadowRef && !this.atBottom) {
      this.shadowRef.scrollTop = 0;
    }
  }
}
