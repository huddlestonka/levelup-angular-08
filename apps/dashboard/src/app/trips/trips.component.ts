import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '@bba/api-interfaces';
import { TripsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips$: Observable<Trip[]> = this.tripsFacade.allTrips$;
  selectedTrip$: Observable<Trip> = this.tripsFacade.selectedTrip$;

  constructor(private tripsFacade: TripsFacade) {}

  ngOnInit(): void {
    this.reset();
    this.tripsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadTrips();
    this.tripsFacade.selectTrip(null);
  }

  resetForm() {
    this.tripsFacade.selectTrip(null);
  }

  selectTrip(trip: Trip) {
    this.tripsFacade.selectTrip(trip.id);
  }

  loadTrips() {
    this.tripsFacade.loadTrips();
  }

  saveTrip(trip: Trip) {
    if (trip.id) {
      this.tripsFacade.updateTrip(trip);
    } else {
      this.tripsFacade.createTrip(trip);
    }
  }

  deleteTrip(trip: Trip) {
    this.tripsFacade.deleteTrip(trip);
  }
}
