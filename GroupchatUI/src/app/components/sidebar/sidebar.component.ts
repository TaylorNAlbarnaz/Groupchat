import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GroupDto } from 'src/app/models/groupDto';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output("openSettings") openSettings: EventEmitter<any> = new EventEmitter();
  @Output("createGroup") createGroup: EventEmitter<any> = new EventEmitter();
  @Input() target: number;

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];

  @Output() messageQntChange: EventEmitter<any> = new EventEmitter();
  @Input() messageQnt: number = 10;

  @Output() groupMessageQntChange: EventEmitter<any> = new EventEmitter();
  @Input() groupMessageQnt: number = 10;

  @Output() groupsChange: EventEmitter<any> = new EventEmitter();
  @Input() groups: GroupDto[] = [];

  @Output() currentGroupIdChange: EventEmitter<any> = new EventEmitter();
  @Input() currentGroupId: number = -1;

  currentGroup: number = -1;

  openSidebar = false;

  displayTag = false;
  currentTag = "Tag";
  currentTagY = "200px";

  userId = 0;

  ngOnInit() {
    this.userId = parseInt(this.cookieService.get('userId'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      this.updateGroupMessages();
    }
    if (changes['groups']) {
      if (this.currentGroup = -1) {
        this.changeGroup(0);
      }
    }
  }

  getTagPosition(target: number) {
    const el = document.querySelector('#button'+target) as HTMLElement;
    this.currentTagY = (el.getBoundingClientRect().y) +"px";
  }

  changeGroup(id: number) {
    this.currentGroup = id;

    if (this.groups[this.currentGroup]) {
      const groupId = this.groups[this.currentGroup].id;

      this.messageService.getMessageQnt(this.currentGroupId).subscribe({
        next: (res) => {
          this.groupMessageQnt = parseInt(res);
          this.groupMessageQntChange.emit(this.groupMessageQnt);
        }
      });

      this.currentGroupId = groupId;
      this.currentGroupIdChange.emit(this.currentGroupId);
    }
  }

  updateGroupMessages() {
    if (this.messages != null && this.messages.length != 0 && this.groups[this.currentGroup] != null) {
      this.groups[this.currentGroup].messages = this.messages;
    }
  }

  constructor(private messageService: MessageService, private cookieService: CookieService) {}
}
