import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TRIPS_FEATURE_KEY,
  State,
  TripsPartialState,
  tripsAdapter,
} from './trips.reducer';

// Lookup the 'Trips' feature state managed by NgRx
export const getTripsState = createFeatureSelector<TripsPartialState, State>(
  TRIPS_FEATURE_KEY
);

const { selectAll, selectEntities } = tripsAdapter.getSelectors();

export const getTripsLoaded = createSelector(
  getTripsState,
  (state: State) => state.loaded
);

export const getTripsError = createSelector(
  getTripsState,
  (state: State) => state.error
);

export const getAllTrips = createSelector(getTripsState, (state: State) =>
  selectAll(state)
);

export const getTripsEntities = createSelector(getTripsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getTripsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getTripsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
