import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Group } from 'src/app/models/group';
import { GroupDto } from 'src/app/models/groupDto';
import { LoginDto } from 'src/app/models/loginDto';
import { Message } from 'src/app/models/message';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

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

  @Output() currentGroupIdChange: EventEmitter<any> = new EventEmitter();
  @Input() currentGroupId: number = -1;

  @Output() loggedUserChange: EventEmitter<any> = new EventEmitter();
  @Input() loggedUser: string = '';

  constructor(private cookieService: CookieService, private groupService: GroupService, private messageService: MessageService,
    private loginService: LoginService ,private router: Router, private changeDetector: ChangeDetectorRef) {}

  openSettings() {
    this.settings = true;
  }

  ngOnInit() {
    const email = this.cookieService.get("email")
    const password = this.cookieService.get("password");

    const loginDto = new LoginDto();
    loginDto.email = email;
    loginDto.password = password;

    if (email != "") {
      this.loginService.login(loginDto).subscribe({
        next: (result) => {
          this.loggedUser = result.user.username;
          this.loggedUserChange.emit(this.loggedUser);

          this.cookieService.set('username', result.user.username)
          this.router.navigate(['/']);
        },
        error: () => {
          this.cookieService.delete('username')
          this.cookieService.delete('email')
          this.cookieService.delete('password')

          this.router.navigate(['/auth'])
        }
      });
    } else {
      this.router.navigate(['/auth'])
    }

    this.loadGroups();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changed");
    if (changes['currentGroupId']) {
      console.log("Changed currentGroupId");
      if (this.currentGroupId != -1) {
        console.log("loadMessages Called");
        this.loadMessages(this.currentGroupId);
      }
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
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

      if (this.currentGroupId === -1) {
        this.currentGroupId = this.groups[0].id;
        this.currentGroupIdChange.emit(this.currentGroupId);

        this.loadMessages(this.currentGroupId);
      }

      this.groupsChange.emit(this.groups);
    });
  }

  loadMessages(groupId: number) {
    this.messageService.getMessages(groupId).subscribe((result: Message[]) => {
      this.messages = result;
      this.messagesChange.emit(this.messages);
      console.log(this.messages)
    });
  }
}
