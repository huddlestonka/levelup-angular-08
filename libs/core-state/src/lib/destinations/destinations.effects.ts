import { Injectable } from '@angular/core';
import { Destination } from '@bba/api-interfaces';
import { DestinationsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as DestinationsActions from './destinations.actions';

@Injectable()
export class DestinationsEffects {
  @Effect() loadDestinations$ = this.actions$.pipe(
    ofType(DestinationsActions.loadDestinations),
    fetch({
      run: (action) =>
        this.destinationsService
          .all()
          .pipe(
            map((destinations: Destination[]) =>
              DestinationsActions.loadDestinationsSuccess({ destinations })
            )
          ),
      onError: (action, error) =>
        DestinationsActions.loadDestinationsFailure({ error }),
    })
  );

  @Effect() loadDestination$ = this.actions$.pipe(
    ofType(DestinationsActions.loadDestination),
    fetch({
      run: (action) =>
        this.destinationsService
          .find(action.destinationId)
          .pipe(
            map((destination: Destination) =>
              DestinationsActions.loadDestinationSuccess({ destination })
            )
          ),
      onError: (action, error) =>
        DestinationsActions.loadDestinationFailure({ error }),
    })
  );

  @Effect() createDestination$ = this.actions$.pipe(
    ofType(DestinationsActions.createDestination),
    pessimisticUpdate({
      run: (action) =>
        this.destinationsService
          .create(action.destination)
          .pipe(
            map((destination: Destination) =>
              DestinationsActions.createDestinationSuccess({ destination })
            )
          ),
      onError: (action, error) =>
        DestinationsActions.createDestinationFailure({ error }),
    })
  );

  @Effect() updateDestination$ = this.actions$.pipe(
    ofType(DestinationsActions.updateDestination),
    pessimisticUpdate({
      run: (action) =>
        this.destinationsService
          .update(action.destination)
          .pipe(
            map((destination: Destination) =>
              DestinationsActions.updateDestinationSuccess({ destination })
            )
          ),
      onError: (action, error) =>
        DestinationsActions.updateDestinationFailure({ error }),
    })
  );

  @Effect() deleteDestination$ = this.actions$.pipe(
    ofType(DestinationsActions.deleteDestination),
    pessimisticUpdate({
      run: (action) =>
        this.destinationsService
          .delete(action.destination)
          .pipe(
            map((destination: Destination) =>
              DestinationsActions.deleteDestinationSuccess({ destination })
            )
          ),
      onError: (action, error) =>
        DestinationsActions.deleteDestinationFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private destinationsService: DestinationsService
  ) {}
}
