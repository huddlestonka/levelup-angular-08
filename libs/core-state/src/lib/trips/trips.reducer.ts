import { Trip } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TripsActions from './trips.actions';

export const TRIPS_FEATURE_KEY = 'trips';

export interface TripsState extends EntityState<Trip> {
  selectedId?: string | number; // which Trips record has been selected
  loaded: boolean; // has the Trips list been loaded
  error?: string | null; // last known error (if any)
}

export interface TripsPartialState {
  readonly [TRIPS_FEATURE_KEY]: TripsState;
}

export const tripsAdapter: EntityAdapter<Trip> = createEntityAdapter<Trip>();

export const initialTripsState: TripsState = tripsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const onFailure = (state, { error }) => ({ ...state, error });

const _tripsReducer = createReducer(
  initialTripsState,
  on(TripsActions.selectTrip, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(TripsActions.resetSelectedTrip, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(TripsActions.resetTrips, (state) => tripsAdapter.removeAll(state)),
  // Load trips
  on(TripsActions.loadTrips, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TripsActions.loadTripsSuccess, (state, { trips }) =>
    tripsAdapter.setAll(trips, { ...state, loaded: true })
  ),
  on(TripsActions.loadTripsFailure, onFailure),
  // Load trip
  on(TripsActions.loadTrip, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TripsActions.loadTripSuccess, (state, { trip }) =>
    tripsAdapter.upsertOne(trip, { ...state, loaded: true })
  ),
  on(TripsActions.loadTripFailure, onFailure),
  // Add trip
  on(TripsActions.createTripSuccess, (state, { trip }) =>
    tripsAdapter.addOne(trip, state)
  ),
  on(TripsActions.createTripFailure, onFailure),
  // Update trip
  on(TripsActions.updateTripSuccess, (state, { trip }) =>
    tripsAdapter.updateOne({ id: trip.id, changes: trip }, state)
  ),
  on(TripsActions.updateTripFailure, onFailure),
  // Delete trip
  on(TripsActions.deleteTripSuccess, (state, { trip }) =>
    tripsAdapter.removeOne(trip.id, state)
  ),
  on(TripsActions.deleteTripFailure, onFailure)
);

export function tripsReducer(state: TripsState | undefined, action: Action) {
  return _tripsReducer(state, action);
}
