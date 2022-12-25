import { Component, ElementRef, Input } from '@angular/core';
import { SidebarGroupComponent } from '../sidebar-group/sidebar-group.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() target: any;
  buttons: string[] = ["Grupo 1", "Grupo 2", "Grupo 3"];

  openSidebar: boolean = false;

  displayTag: boolean = false;
  currentTag: string = "Tag";
  currentTagY: string = "200px";

  getTagPosition(target: number) {
    const el = document.querySelector('#button'+target) as HTMLElement;
    this.currentTagY = (el.getBoundingClientRect().y) +"px";
  }
}
