import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DestinationsFeature from './destinations.reducer';
import * as DestinationsActions from './destinations.actions';

@Injectable()
export class DestinationsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinationsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DestinationsActions.loadDestinationsSuccess({
            destinations: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DestinationsActions.loadDestinationsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
