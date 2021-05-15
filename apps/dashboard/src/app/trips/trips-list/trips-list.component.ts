import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Trip } from '@bba/api-interfaces';

@Component({
  selector: 'bba-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent {
  @Input() trips: Trip[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
