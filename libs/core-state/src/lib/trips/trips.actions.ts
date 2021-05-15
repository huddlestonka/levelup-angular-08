import { createAction, props } from '@ngrx/store';
import { TripsEntity } from './trips.models';

export const init = createAction('[Trips Page] Init');

export const loadTripsSuccess = createAction(
  '[Trips/API] Load Trips Success',
  props<{ trips: TripsEntity[] }>()
);

export const loadTripsFailure = createAction(
  '[Trips/API] Load Trips Failure',
  props<{ error: any }>()
);
