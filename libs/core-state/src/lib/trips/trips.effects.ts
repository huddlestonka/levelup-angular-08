import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TripsFeature from './trips.reducer';
import * as TripsActions from './trips.actions';

@Injectable()
export class TripsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return TripsActions.loadTripsSuccess({ trips: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TripsActions.loadTripsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
