import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Group } from 'src/app/models/group';
import { GroupDto } from 'src/app/models/groupDto';
import { Message } from 'src/app/models/message';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  settings: boolean = false;

  @Output() messagesChange: EventEmitter<any> = new EventEmitter();
  messages: Message[];

  @Output() groupsChange: EventEmitter<any> = new EventEmitter();
  groups: GroupDto[] = [];

  constructor(private cookieService: CookieService, private groupService: GroupService, private router: Router) {}

  openSettings() {
    this.settings = true;
  }

  ngOnInit() {
    if (this.cookieService.get("email") === "") {
      this.router.navigate(['/auth'])
    }

    this.loadGroups();
  }

  // API
  loadGroups() {
    let dbGroups: Group[];
    this.groupService.getGroups().subscribe((result: Group[]) => {
      dbGroups = result
      for (const group of dbGroups) {
        const groupDto = new GroupDto();
        groupDto.id = group.id;
        groupDto.name = group.name;
        groupDto.adminId = group.adminId;
        groupDto.groupUsers = group.groupUsers;
        groupDto.messages = group.messages;

        this.groups = this.groups.concat(groupDto);
      }

      this.groupsChange.emit(this.groups);
      console.log(this.groups);
    });
  }
}
