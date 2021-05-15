import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bba-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title = '';
  @Input() isAuthenticated = false;
  @Input() sidenavEnabled: boolean;
  @Output() toggleSidenav = new EventEmitter();
}
