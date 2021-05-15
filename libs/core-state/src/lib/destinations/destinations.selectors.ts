import { Destination } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DESTINATIONS_FEATURE_KEY,
  DestinationsState,
  destinationsAdapter,
} from './destinations.reducer';

// Lookup the 'Destinations' feature state managed by NgRx
export const getDestinationsState = createFeatureSelector<DestinationsState>(
  DESTINATIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = destinationsAdapter.getSelectors();

export const getDestinationsLoaded = createSelector(
  getDestinationsState,
  (state: DestinationsState) => state.loaded
);

export const getDestinationsError = createSelector(
  getDestinationsState,
  (state: DestinationsState) => state.error
);

export const getAllDestinations = createSelector(
  getDestinationsState,
  (state: DestinationsState) => selectAll(state)
);

export const getDestinationsEntities = createSelector(
  getDestinationsState,
  (state: DestinationsState) => selectEntities(state)
);

export const getSelectedDestinationId = createSelector(
  getDestinationsState,
  (state: DestinationsState) => state.selectedId
);

export const getSelectedDestination = createSelector(
  getDestinationsEntities,
  getSelectedDestinationId,
  (entities, selectedId) => {
    const emptyDestination: Destination = {
      id: null,
      title: '',
      description: '',
      date: '',
      tripId: null,
    };

    return selectedId ? entities[selectedId] : emptyDestination;
  }
);
