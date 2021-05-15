import { Component, OnInit } from '@angular/core';
import { TripsFacade, DestinationsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tripDestinations$ = this.tripsFacade.tripDestinations$;

  constructor(
    private tripsFacade: TripsFacade,
    private destinationsFacade: DestinationsFacade
  ) {}

  ngOnInit(): void {
    this.tripsFacade.loadTrips();
    this.destinationsFacade.loadDestinations();
  }
}
