import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromTrips from './trips/trips.reducer';
import * as fromDestinations from './destinations/destinations.reducer';

import * as TripsSelectors from './trips/trips.selectors';
import * as DestinationsSelectors from './destinations/destinations.selectors';
import { Trip, Destination } from '@bba/api-interfaces';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromTrips.TRIPS_FEATURE_KEY]: fromTrips.TripsState;
  [fromDestinations.DESTINATIONS_FEATURE_KEY]: fromDestinations.DestinationsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromTrips.TRIPS_FEATURE_KEY]: fromTrips.tripsReducer,
  [fromDestinations.DESTINATIONS_FEATURE_KEY]:
    fromDestinations.destinationsReducer,
};

// -------------------------------------------------------------------
// Common Selectors
// -------------------------------------------------------------------
export const getTripDestinations = createSelector(
  TripsSelectors.getAllTrips,
  DestinationsSelectors.getAllDestinations,
  (trips: Trip[], destinations: Destination[]) => {
    return trips.map((trip) => ({
      ...trip,
      destinations: destinations.filter(
        (destination) => destination.tripId === trip.id
      ),
    }));
  }
);
