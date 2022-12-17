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
  messages: Message[] = [];

  constructor(private userService: UserService, private groupService: GroupService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.messages = this.messageService.getMessages(this.users);
    this.groups = this.groupService.getGroups(this.users, this.messages);
  }
}
