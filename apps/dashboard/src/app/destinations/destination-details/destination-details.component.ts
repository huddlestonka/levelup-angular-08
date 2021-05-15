import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip, Destination } from '@bba/api-interfaces';

@Component({
  selector: 'bba-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.scss'],
})
export class DestinationDetailsComponent {
  currentDestination: Destination;
  originalTitle = '';
  @Input() trips: Trip[];
  @Input() set destination(value: Destination) {
    if (value) this.originalTitle = value.title;
    this.currentDestination = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
