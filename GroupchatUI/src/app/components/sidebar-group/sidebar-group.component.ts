import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from 'src/app/models/loginDto';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-sidebar-group',
  templateUrl: './sidebar-group.component.html'
})
export class SidebarGroupComponent {
  @Input() groupId = 0;
  @Input() groupName = "Group";
  @Input() selected = false;
  @Input() isAdmin = false;
  @Input() creatable = false;

  deleteGroup() {
    const login = new LoginDto();
    login.email = this.cookieService.get("email");
    login.password = this.cookieService.get("password");

    this.groupService.deleteGroup(this.groupId, login).subscribe({
      error: () => this.reloadPage()
    })
  }

  reloadPage() {
    window.location.reload();
  }

  constructor (private groupService: GroupService, private cookieService: CookieService) { }
}
