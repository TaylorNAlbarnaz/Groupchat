import { Component } from '@angular/core';
import { Group } from './models/group';
import { Message } from './models/message';
import { User } from './models/user';
import { GroupService } from './services/group.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Groupchat.UI';
  
  users: User[] = [];
  groups: Group[] = [];

  constructor(private userService: UserService, private groupService: GroupService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: User[]) => (this.users = result));
    this.groupService.getGroups().subscribe((result: Group[]) => (this.groups = result, this.UpdateGroups()));
  }

  private UpdateGroups() {
    for (let group of this.groups) {
      this.groupService.getGroupById(group.id).subscribe((result: Group) => 
      (
        group.admin = result.admin,
        group.groupUsers = result.groupUsers
        ));
    }

    this.UpdateGroupMessages();
  }

  private UpdateGroupMessages() {
    for (const group of this.groups) {
      this.messageService.getMessages(group.id).subscribe((result: Message[]) => (group.messages = result));
    }
  }
}
