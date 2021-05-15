import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DestinationsActions from './destinations.actions';
import * as DestinationsFeature from './destinations.reducer';
import * as DestinationsSelectors from './destinations.selectors';

@Injectable()
export class DestinationsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DestinationsSelectors.getDestinationsLoaded)
  );
  allDestinations$ = this.store.pipe(
    select(DestinationsSelectors.getAllDestinations)
  );
  selectedDestinations$ = this.store.pipe(
    select(DestinationsSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DestinationsActions.init());
  }
}
