import { Injectable } from '@angular/core';
import { Trip } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { getTripDestinations } from '..';
import * as TripsActions from './trips.actions';
import * as TripsSelectors from './trips.selectors';

@Injectable({
  providedIn: 'root',
})
export class TripsFacade {
  loaded$ = this.store.pipe(select(TripsSelectors.getTripsLoaded));
  allTrips$ = this.store.pipe(select(TripsSelectors.getAllTrips));
  selectedTrip$ = this.store.pipe(select(TripsSelectors.getSelectedTrip));
  tripDestinations$ = this.store.pipe(select(getTripDestinations));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === TripsActions.createTrip({} as any).type ||
        action.type === TripsActions.updateTrip({} as any).type ||
        action.type === TripsActions.deleteTrip({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) {}

  selectTrip(selectedId: string) {
    this.dispatch(TripsActions.selectTrip({ selectedId }));
  }

  loadTrips() {
    this.dispatch(TripsActions.loadTrips());
  }

  loadTrip(tripId: string) {
    this.dispatch(TripsActions.loadTrip({ tripId }));
  }

  createTrip(trip: Trip) {
    // We are generate the UUID at the client because of a sqlite limitation
    this.dispatch(
      TripsActions.createTrip({
        trip: Object.assign({}, trip, { id: uuidv4() }),
      })
    );
  }

  updateTrip(trip: Trip) {
    this.dispatch(TripsActions.updateTrip({ trip }));
  }

  deleteTrip(trip: Trip) {
    this.dispatch(TripsActions.deleteTrip({ trip }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
