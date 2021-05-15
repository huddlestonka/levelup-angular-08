import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as TripsActions from './trips.actions';
import * as TripsFeature from './trips.reducer';
import * as TripsSelectors from './trips.selectors';

@Injectable()
export class TripsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TripsSelectors.getTripsLoaded));
  allTrips$ = this.store.pipe(select(TripsSelectors.getAllTrips));
  selectedTrips$ = this.store.pipe(select(TripsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TripsActions.init());
  }
}
