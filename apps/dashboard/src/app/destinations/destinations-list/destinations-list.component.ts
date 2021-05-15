import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Destination } from '@bba/api-interfaces';

@Component({
  selector: 'bba-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.scss'],
})
export class DestinationsListComponent {
  @Input() destinations: Destination[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
