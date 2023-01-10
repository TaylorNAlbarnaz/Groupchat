import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent {
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Input() show: boolean;

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
