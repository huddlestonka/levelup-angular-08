import { Destination } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as DestinationsActions from './destinations.actions';

export const DESTINATIONS_FEATURE_KEY = 'destinations';

export interface DestinationsState extends EntityState<Destination> {
  selectedId?: string | number; // which Destinations record has been selected
  loaded: boolean; // has the Destinations list been loaded
  error?: string | null; // last known error (if any)
}

export interface DestinationsPartialState {
  readonly [DESTINATIONS_FEATURE_KEY]: DestinationsState;
}

export const destinationsAdapter: EntityAdapter<Destination> = createEntityAdapter<Destination>();

export const initialDestinationsState: DestinationsState = destinationsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _destinationsReducer = createReducer(
  initialDestinationsState,
  on(DestinationsActions.selectDestination, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(DestinationsActions.resetSelectedDestination, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(DestinationsActions.resetDestinations, (state) =>
    destinationsAdapter.removeAll(state)
  ),
  // Load destinations
  on(DestinationsActions.loadDestinations, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) =>
    destinationsAdapter.setAll(destinations, { ...state, loaded: true })
  ),
  on(DestinationsActions.loadDestinationsFailure, onFailure),
  // Load destination
  on(DestinationsActions.loadDestination, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DestinationsActions.loadDestinationSuccess, (state, { destination }) =>
    destinationsAdapter.upsertOne(destination, { ...state, loaded: true })
  ),
  on(DestinationsActions.loadDestinationFailure, onFailure),
  // Add destination
  on(DestinationsActions.createDestinationSuccess, (state, { destination }) =>
    destinationsAdapter.addOne(destination, state)
  ),
  on(DestinationsActions.createDestinationFailure, onFailure),
  // Update destination
  on(DestinationsActions.updateDestinationSuccess, (state, { destination }) =>
    destinationsAdapter.updateOne(
      { id: destination.id, changes: destination },
      state
    )
  ),
  on(DestinationsActions.updateDestinationFailure, onFailure),
  // Delete destination
  on(DestinationsActions.deleteDestinationSuccess, (state, { destination }) =>
    destinationsAdapter.removeOne(destination.id, state)
  ),
  on(DestinationsActions.deleteDestinationFailure, onFailure)
);

export function destinationsReducer(
  state: DestinationsState | undefined,
  action: Action
) {
  return _destinationsReducer(state, action);
}
