import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GroupDto } from 'src/app/models/groupDto';
import { Message } from 'src/app/models/message';
import { MessageDto } from 'src/app/models/messageDto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output("openSettings") openSettings: EventEmitter<any> = new EventEmitter();
  @Input() target: number;

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: Message[];

  @Output() groupsChange: EventEmitter<any> = new EventEmitter();
  @Input() groups: GroupDto[] = [];

  currentGroup: number = -1;

  openSidebar = false;

  displayTag = false;
  currentTag = "Tag";
  currentTagY = "200px";

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

    //this.messages = this.groups[id].messages;
    //this.messagesChange.emit(this.messages);
  }

  updateGroupMessages() {
    if (this.messages != null && this.messages.length != 0 && this.groups[this.currentGroup] != null) {
      this.groups[this.currentGroup].messages = this.messages;
    }
  }
}
