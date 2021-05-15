import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '@bba/api-interfaces';

@Component({
  selector: 'bba-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent {
  currentTrip: Trip;
  originalTitle = '';
  @Input() set trip(value: Trip) {
    if (value) this.originalTitle = value.title;
    this.currentTrip = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
