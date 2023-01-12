import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GroupDto } from 'src/app/models/groupDto';
import { MessageDto } from 'src/app/models/messageDto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() target: number;
  @Output("openSettings") openSettings: EventEmitter<any> = new EventEmitter();

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  @Input() messages: MessageDto[];

  currentGroup: number = 0;
  
  groups: GroupDto[] = [];

  openSidebar = false;

  displayTag = false;
  currentTag = "Tag";
  currentTagY = "200px";

  ngOnInit() {
    setTimeout(() => {
      this.createSampleGroups();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['messages']) {
      this.updateGroupMessages();
    }
  }

  getTagPosition(target: number) {
    const el = document.querySelector('#button'+target) as HTMLElement;
    this.currentTagY = (el.getBoundingClientRect().y) +"px";
  }

  createSampleGroups() {
    for (let i = 0; i < 3; i++) {
      const newGroup = new GroupDto();
      newGroup.name = "Group " + i;
      newGroup.groupUsers = [];
      newGroup.adminId = 0;

      let messageDtoList: MessageDto[] = [];
      const messagesDb: string[] = Array.from(Array(20).keys()).map(n => n.toString().repeat(100));
      for (let i = 0; i < messagesDb.length; i ++) {
        const newMessage = new MessageDto();
        newMessage.content = messagesDb[i];
        newMessage.login = '';
        
        messageDtoList = messageDtoList.concat(newMessage);

        newGroup.messages = messageDtoList;
      }

      this.groups = this.groups.concat(newGroup);
    }
    this.changeGroup(0)
  }

  changeGroup(id: number) {
    this.currentGroup = id;

    this.messages = this.groups[id].messages;
    this.messagesChange.emit(this.messages);
  }

  updateGroupMessages() {
    if (this.messages != null && this.messages.length != 0) {
      this.groups[this.currentGroup].messages = this.messages;
    }
  }
}
