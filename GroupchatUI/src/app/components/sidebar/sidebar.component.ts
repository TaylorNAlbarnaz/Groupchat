import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() target: number;
  buttons: string[] = ["Grupo 1", "Grupo 2", "Grupo 3"];

  openSidebar = false;

  displayTag = false;
  currentTag = "Tag";
  currentTagY = "200px";

  getTagPosition(target: number) {
    const el = document.querySelector('#button'+target) as HTMLElement;
    this.currentTagY = (el.getBoundingClientRect().y) +"px";
  }
}
