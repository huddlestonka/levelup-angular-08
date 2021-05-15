import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DestinationsActions from './destinations.actions';
import { DestinationsEntity } from './destinations.models';

export const DESTINATIONS_FEATURE_KEY = 'destinations';

export interface State extends EntityState<DestinationsEntity> {
  selectedId?: string | number; // which Destinations record has been selected
  loaded: boolean; // has the Destinations list been loaded
  error?: string | null; // last known error (if any)
}

export interface DestinationsPartialState {
  readonly [DESTINATIONS_FEATURE_KEY]: State;
}

export const destinationsAdapter: EntityAdapter<DestinationsEntity> = createEntityAdapter<DestinationsEntity>();

export const initialState: State = destinationsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const destinationsReducer = createReducer(
  initialState,
  on(DestinationsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) =>
    destinationsAdapter.setAll(destinations, { ...state, loaded: true })
  ),
  on(DestinationsActions.loadDestinationsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return destinationsReducer(state, action);
}
