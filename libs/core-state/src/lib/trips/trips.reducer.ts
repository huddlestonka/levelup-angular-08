import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TripsActions from './trips.actions';
import { TripsEntity } from './trips.models';

export const TRIPS_FEATURE_KEY = 'trips';

export interface State extends EntityState<TripsEntity> {
  selectedId?: string | number; // which Trips record has been selected
  loaded: boolean; // has the Trips list been loaded
  error?: string | null; // last known error (if any)
}

export interface TripsPartialState {
  readonly [TRIPS_FEATURE_KEY]: State;
}

export const tripsAdapter: EntityAdapter<TripsEntity> = createEntityAdapter<TripsEntity>();

export const initialState: State = tripsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const tripsReducer = createReducer(
  initialState,
  on(TripsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(TripsActions.loadTripsSuccess, (state, { trips }) =>
    tripsAdapter.setAll(trips, { ...state, loaded: true })
  ),
  on(TripsActions.loadTripsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return tripsReducer(state, action);
}
