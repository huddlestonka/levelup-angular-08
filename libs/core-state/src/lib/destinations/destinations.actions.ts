import { createAction, props } from '@ngrx/store';
import { DestinationsEntity } from './destinations.models';

export const init = createAction('[Destinations Page] Init');

export const loadDestinationsSuccess = createAction(
  '[Destinations/API] Load Destinations Success',
  props<{ destinations: DestinationsEntity[] }>()
);

export const loadDestinationsFailure = createAction(
  '[Destinations/API] Load Destinations Failure',
  props<{ error: any }>()
);
