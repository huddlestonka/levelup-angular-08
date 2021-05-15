import { Trip } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedTrip = createAction('[Trips] Reset Selected Trip');
export const resetTrips = createAction('[Trips] Reset Trips');

// Select Trip
export const selectTrip = createAction(
  '[Trips] Select Trip',
  props<{ selectedId: string }>()
);

// Load Trips
export const loadTrips = createAction('[Trips] Load Trips');

export const loadTripsSuccess = createAction(
  '[Trips] Load Trips Success',
  props<{ trips: Trip[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips] Load Trips Failure',
  props<{ error: any }>()
);

// Load Trip
export const loadTrip = createAction(
  '[Trips] Load Trip',
  props<{ tripId: string }>()
);

export const loadTripSuccess = createAction(
  '[Trips] Load Trip Success',
  props<{ trip: Trip }>()
);

export const loadTripFailure = createAction(
  '[Trips] Load Trip Failure',
  props<{ error: any }>()
);

// Create Trip
export const createTrip = createAction(
  '[Trips] Create Trip',
  props<{ trip: Trip }>()
);

export const createTripSuccess = createAction(
  '[Trips] Create Trip Success',
  props<{ trip: Trip }>()
);

export const createTripFailure = createAction(
  '[Trips] Create Trip Failure',
  props<{ error: any }>()
);

// Update Trip
export const updateTrip = createAction(
  '[Trips] Update Trip',
  props<{ trip: Trip }>()
);

export const updateTripSuccess = createAction(
  '[Trips] Update Trip Success',
  props<{ trip: Trip }>()
);

export const updateTripFailure = createAction(
  '[Trips] Update Trip Failure',
  props<{ error: any }>()
);

// Delete Trip
export const deleteTrip = createAction(
  '[Trips] Delete Trip',
  props<{ trip: Trip }>()
);

export const deleteTripCancelled = createAction(
  '[Trips] Delete Trip Cancelled'
);

export const deleteTripSuccess = createAction(
  '[Trips] Delete Trip Success',
  props<{ trip: Trip }>()
);

export const deleteTripFailure = createAction(
  '[Trips] Delete Trip Failure',
  props<{ error: any }>()
);
