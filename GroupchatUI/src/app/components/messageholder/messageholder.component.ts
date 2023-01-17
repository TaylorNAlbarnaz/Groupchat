import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message-holder',
  templateUrl: './messageholder.component.html',
  styleUrls: ['./messageholder.component.css']
})
export class MessageHolderComponent implements AfterViewInit{
  shadowRef: Element | null;
  loading: boolean = false;
  atBottom: boolean = true;
  atTop: boolean = false;
  
  loggedUser: number;

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];

  @Output() messageQntChange: EventEmitter<any> = new EventEmitter();
  @Input() messageQnt: number = 10;

  @Output() groupMessageQntChange: EventEmitter<any> = new EventEmitter();
  @Input() groupMessageQnt: number = 10;

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

    this.atBottom = (scrollTop > -20);
    this.atTop = (-(scrollHeight - divHeight) >= scrollTop - 25);

    if (!this.atTop) {
      this.loading = false;
    }

    console.log(this.atBottom, this.atTop);
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
    console.log(this.messageQnt, this.groupMessageQnt)
    this.loading = true;
    this.messageQnt += 10;
    this.messageQntChange.emit(this.messageQnt);
  }
}
