import * as TripsActions from './trips.actions';
import { TripsState, initialTripsState, tripsReducer } from './trips.reducer';
import { mockTrip, mockEmptyTrip } from '@bba/testing';

describe('Trips Reducer', () => {
  let trips;

  beforeEach(() => {
    trips = [
      { ...mockTrip, id: '0' },
      { ...mockTrip, id: '1' },
      { ...mockTrip, id: '2' },
    ];
  });

  describe('valid Trips actions', () => {
    it('loadTrips should set loaded to false', () => {
      const action = TripsActions.loadTrips();
      const expectedState = {
        ...initialTripsState,
        error: null,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadTripsSuccess should set the list of known Trips', () => {
      const action = TripsActions.loadTripsSuccess({ trips });
      const expectedState = {
        ...initialTripsState,
        loaded: true,
        entities: {
          0: trips[0],
          1: trips[1],
          2: trips[2],
        },
        ids: trips.map((trip) => trip.id),
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadTripsFailure should set error to error', () => {
      const error = new Error();
      const action = TripsActions.loadTripsFailure({ error });
      const expectedState = {
        ...initialTripsState,
        error,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadTrip should set loaded to false', () => {
      const action = TripsActions.loadTrip({ tripId: mockTrip.id });
      const expectedState = {
        ...initialTripsState,
        loaded: false,
        error: null,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadTripSuccess should set loaded to true', () => {
      const action = TripsActions.loadTripSuccess({
        trip: mockTrip,
      });
      const expectedState = {
        ...initialTripsState,
        loaded: true,
        entities: {
          0: mockTrip,
        },
        ids: [mockTrip.id],
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadTripFailure should set error to error', () => {
      const error = new Error();
      const action = TripsActions.loadTripFailure({ error });
      const expectedState = {
        ...initialTripsState,
        error,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateTripSuccess should modify trip', () => {
      const prepAction = TripsActions.loadTripSuccess({
        trip: { ...mockEmptyTrip, id: mockTrip.id },
      });
      const prepState: TripsState = tripsReducer(initialTripsState, prepAction);

      const expectedState = {
        ...initialTripsState,
        loaded: true,
        entities: {
          0: mockTrip,
        },
        ids: [mockTrip.id],
      };

      const action = TripsActions.updateTripSuccess({
        trip: mockTrip,
      });
      const result: TripsState = tripsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateTripFailure should set error to error', () => {
      const error = new Error();
      const action = TripsActions.updateTripFailure({ error });
      const expectedState = {
        ...initialTripsState,
        error,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createTripSuccess should add trip', () => {
      const action = TripsActions.createTripSuccess({
        trip: mockTrip,
      });
      const expectedState = {
        ...initialTripsState,
        loaded: false,
        entities: {
          0: mockTrip,
        },
        ids: [mockTrip.id],
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createTripFailure should set error to error', () => {
      const error = new Error();
      const action = TripsActions.createTripFailure({ error });
      const expectedState = {
        ...initialTripsState,
        error,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteTripSuccess should add trip', () => {
      const prepAction = TripsActions.loadTripSuccess({
        trip: mockTrip,
      });
      const prepState: TripsState = tripsReducer(initialTripsState, prepAction);

      const expectedState = {
        ...initialTripsState,
        loaded: true,
      };

      const action = TripsActions.deleteTripSuccess({
        trip: mockTrip,
      });
      const result: TripsState = tripsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteTripFailure should set error to error', () => {
      const error = new Error();
      const action = TripsActions.deleteTripFailure({ error });
      const expectedState = {
        ...initialTripsState,
        error,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('selectTrip should set selectedId', () => {
      const action = TripsActions.selectTrip({
        selectedId: mockTrip.id,
      });
      const expectedState = {
        ...initialTripsState,
        selectedId: mockTrip.id,
      };

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedTrip should reset selectedId', () => {
      const prepAction = TripsActions.selectTrip({
        selectedId: mockTrip.id,
      });
      const prepState = tripsReducer(initialTripsState, prepAction);

      const action = TripsActions.resetSelectedTrip();
      const expectedState = {
        ...initialTripsState,
        selectedId: null,
      };

      const result: TripsState = tripsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetTrips should reset trips', () => {
      const prepAction = TripsActions.loadTripsSuccess({ trips });
      const prepState: TripsState = tripsReducer(initialTripsState, prepAction);

      const expectedState = {
        ...initialTripsState,
        loaded: true,
      };

      const action = TripsActions.resetTrips();
      const result: TripsState = tripsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: TripsState = tripsReducer(initialTripsState, action);

      expect(result).toBe(initialTripsState);
    });
  });
});
