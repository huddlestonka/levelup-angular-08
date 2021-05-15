import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTrips from './trips/trips.reducer';
import { TripsEffects } from './trips/trips.effects';
import { TripsFacade } from './trips/trips.facade';
import * as fromDestinations from './destinations/destinations.reducer';
import { DestinationsEffects } from './destinations/destinations.effects';
import { DestinationsFacade } from './destinations/destinations.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTrips.TRIPS_FEATURE_KEY, fromTrips.reducer),
    EffectsModule.forFeature([TripsEffects]),
    StoreModule.forFeature(
      fromDestinations.DESTINATIONS_FEATURE_KEY,
      fromDestinations.reducer
    ),
    EffectsModule.forFeature([DestinationsEffects]),
  ],
  providers: [TripsFacade, DestinationsFacade],
})
export class CoreStateModule {}
