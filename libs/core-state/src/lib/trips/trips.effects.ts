import { Injectable } from '@angular/core';
import { Trip } from '@bba/api-interfaces';
import { TripsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as TripsActions from './trips.actions';

@Injectable()
export class TripsEffects {
  @Effect() loadTrips$ = this.actions$.pipe(
    ofType(TripsActions.loadTrips),
    fetch({
      run: (action) =>
        this.tripsService
          .all()
          .pipe(
            map((trips: Trip[]) => TripsActions.loadTripsSuccess({ trips }))
          ),
      onError: (action, error) => TripsActions.loadTripsFailure({ error }),
    })
  );

  @Effect() loadTrip$ = this.actions$.pipe(
    ofType(TripsActions.loadTrip),
    fetch({
      run: (action) =>
        this.tripsService
          .find(action.tripId)
          .pipe(map((trip: Trip) => TripsActions.loadTripSuccess({ trip }))),
      onError: (action, error) => TripsActions.loadTripFailure({ error }),
    })
  );

  @Effect() createTrip$ = this.actions$.pipe(
    ofType(TripsActions.createTrip),
    pessimisticUpdate({
      run: (action) =>
        this.tripsService
          .create(action.trip)
          .pipe(map((trip: Trip) => TripsActions.createTripSuccess({ trip }))),
      onError: (action, error) => TripsActions.createTripFailure({ error }),
    })
  );

  @Effect() updateTrip$ = this.actions$.pipe(
    ofType(TripsActions.updateTrip),
    pessimisticUpdate({
      run: (action) =>
        this.tripsService
          .update(action.trip)
          .pipe(map((trip: Trip) => TripsActions.updateTripSuccess({ trip }))),
      onError: (action, error) => TripsActions.updateTripFailure({ error }),
    })
  );

  @Effect() deleteTrip$ = this.actions$.pipe(
    ofType(TripsActions.deleteTrip),
    pessimisticUpdate({
      run: (action) =>
        this.tripsService
          .delete(action.trip)
          .pipe(map((trip: Trip) => TripsActions.deleteTripSuccess({ trip }))),
      onError: (action, error) => TripsActions.deleteTripFailure({ error }),
    })
  );

  constructor(private actions$: Actions, private tripsService: TripsService) {}
}
