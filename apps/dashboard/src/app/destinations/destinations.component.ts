import { Component, OnInit } from '@angular/core';
import { Trip, Destination } from '@bba/api-interfaces';
import { TripsFacade, DestinationsFacade } from '@bba/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'bba-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  trips$: Observable<Trip[]> = this.tripsFacade.allTrips$;
  destinations$: Observable<Destination[]> = this.destinationsFacade
    .allDestinations$;
  selectedDestination$: Observable<Destination> = this.destinationsFacade
    .selectedDestination$;

  constructor(
    private destinationsFacade: DestinationsFacade,
    private tripsFacade: TripsFacade
  ) {}

  ngOnInit(): void {
    this.reset();
    this.destinationsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadDestinations();
    this.loadTrips();
    this.destinationsFacade.selectDestination(null);
  }

  resetForm() {
    this.destinationsFacade.selectDestination(null);
  }

  loadDestinations() {
    this.destinationsFacade.loadDestinations();
  }

  loadTrips() {
    this.tripsFacade.loadTrips();
  }

  selectDestination(destination: Destination) {
    this.destinationsFacade.selectDestination(destination.id);
  }

  saveDestination(destination: Destination) {
    if (destination.id) {
      this.destinationsFacade.updateDestination(destination);
    } else {
      this.destinationsFacade.createDestination(destination);
    }
  }

  deleteDestination(destination: Destination) {
    this.destinationsFacade.deleteDestination(destination);
  }
}
