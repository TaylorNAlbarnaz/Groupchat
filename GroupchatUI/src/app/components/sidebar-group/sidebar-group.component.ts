import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-group',
  templateUrl: './sidebar-group.component.html'
})
export class SidebarGroupComponent {
  @Input() selected = false;
}
