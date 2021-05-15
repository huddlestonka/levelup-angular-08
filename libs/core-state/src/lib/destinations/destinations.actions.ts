import { Destination } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedDestination = createAction(
  '[Destinations] Reset Selected Destination'
);
export const resetDestinations = createAction(
  '[Destinations] Reset Destinations'
);

// Select Destination
export const selectDestination = createAction(
  '[Destinations] Select Destination',
  props<{ selectedId: string }>()
);

// Load Destinations
export const loadDestinations = createAction(
  '[Destinations] Load Destinations'
);

export const loadDestinationsSuccess = createAction(
  '[Destinations] Load Destinations Success',
  props<{ destinations: Destination[] }>()
);

export const loadDestinationsFailure = createAction(
  '[Destinations] Load Destinations Failure',
  props<{ error: any }>()
);

// Load Destination
export const loadDestination = createAction(
  '[Destinations] Load Destination',
  props<{ destinationId: string }>()
);

export const loadDestinationSuccess = createAction(
  '[Destinations] Load Destination Success',
  props<{ destination: Destination }>()
);

export const loadDestinationFailure = createAction(
  '[Destinations] Load Destination Failure',
  props<{ error: any }>()
);

// Create Destination
export const createDestination = createAction(
  '[Destinations] Create Destination',
  props<{ destination: Destination }>()
);

export const createDestinationSuccess = createAction(
  '[Destinations] Create Destination Success',
  props<{ destination: Destination }>()
);

export const createDestinationFailure = createAction(
  '[Destinations] Create Destination Failure',
  props<{ error: any }>()
);

// Update Destination
export const updateDestination = createAction(
  '[Destinations] Update Destination',
  props<{ destination: Destination }>()
);

export const updateDestinationSuccess = createAction(
  '[Destinations] Update Destination Success',
  props<{ destination: Destination }>()
);

export const updateDestinationFailure = createAction(
  '[Destinations] Update Destination Failure',
  props<{ error: any }>()
);

// Delete Destination
export const deleteDestination = createAction(
  '[Destinations] Delete Destination',
  props<{ destination: Destination }>()
);

export const deleteDestinationCancelled = createAction(
  '[Destinations] Delete Destination Cancelled'
);

export const deleteDestinationSuccess = createAction(
  '[Destinations] Delete Destination Success',
  props<{ destination: Destination }>()
);

export const deleteDestinationFailure = createAction(
  '[Destinations] Delete Destination Failure',
  props<{ error: any }>()
);
