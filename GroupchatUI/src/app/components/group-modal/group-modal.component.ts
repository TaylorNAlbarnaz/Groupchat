import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateGroupDto } from 'src/app/models/createGroupDto';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html'
})
export class GroupModalComponent {
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Input() show: boolean;

  newGroupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  createGroup() {
    this.close();

    const id: number = parseInt(this.cookieService.get('userId'));
    const newGroup = new CreateGroupDto();
    newGroup.name = this.newGroupForm.value.name as string;
    newGroup.adminId = id;
    newGroup.userIds = [id];

    this.groupService.createGroup(newGroup).subscribe({
      error: () => this.reloadPage()
    });
  }

  reloadPage() {
    window.location.reload();
  }

  constructor(private groupService: GroupService, private cookieService: CookieService, private router: Router) { }
}
