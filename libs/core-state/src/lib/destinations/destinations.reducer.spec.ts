import * as DestinationsActions from './destinations.actions';
import {
  DestinationsState,
  initialDestinationsState,
  destinationsReducer,
} from './destinations.reducer';
import { mockDestination, mockEmptyDestination } from '@bba/testing';

describe('Destinations Reducer', () => {
  let destinations;

  beforeEach(() => {
    destinations = [
      { ...mockDestination, id: '0' },
      { ...mockDestination, id: '1' },
      { ...mockDestination, id: '2' },
    ];
  });

  describe('valid Destinations actions', () => {
    it('loadDestinations should set loaded to false', () => {
      const action = DestinationsActions.loadDestinations();
      const expectedState = {
        ...initialDestinationsState,
        error: null,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadDestinationsSuccess should set the list of known Destinations', () => {
      const action = DestinationsActions.loadDestinationsSuccess({
        destinations,
      });
      const expectedState = {
        ...initialDestinationsState,
        loaded: true,
        entities: {
          0: destinations[0],
          1: destinations[1],
          2: destinations[2],
        },
        ids: destinations.map((destination) => destination.id),
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadDestinationsFailure should set error to error', () => {
      const error = new Error();
      const action = DestinationsActions.loadDestinationsFailure({ error });
      const expectedState = {
        ...initialDestinationsState,
        error,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadDestination should set loaded to false', () => {
      const action = DestinationsActions.loadDestination({
        destinationId: mockDestination.id,
      });
      const expectedState = {
        ...initialDestinationsState,
        loaded: false,
        error: null,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadDestinationSuccess should set loaded to true', () => {
      const action = DestinationsActions.loadDestinationSuccess({
        destination: mockDestination,
      });
      const expectedState = {
        ...initialDestinationsState,
        loaded: true,
        entities: {
          0: mockDestination,
        },
        ids: [mockDestination.id],
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadDestinationFailure should set error to error', () => {
      const error = new Error();
      const action = DestinationsActions.loadDestinationFailure({ error });
      const expectedState = {
        ...initialDestinationsState,
        error,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('updateDestinationSuccess should modify destination', () => {
      const prepAction = DestinationsActions.loadDestinationSuccess({
        destination: { ...mockEmptyDestination, id: mockDestination.id },
      });
      const prepState: DestinationsState = destinationsReducer(
        initialDestinationsState,
        prepAction
      );

      const expectedState = {
        ...initialDestinationsState,
        loaded: true,
        entities: {
          0: mockDestination,
        },
        ids: [mockDestination.id],
      };

      const action = DestinationsActions.updateDestinationSuccess({
        destination: mockDestination,
      });
      const result: DestinationsState = destinationsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateDestinationFailure should set error to error', () => {
      const error = new Error();
      const action = DestinationsActions.updateDestinationFailure({ error });
      const expectedState = {
        ...initialDestinationsState,
        error,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createDestinationSuccess should add destination', () => {
      const action = DestinationsActions.createDestinationSuccess({
        destination: mockDestination,
      });
      const expectedState = {
        ...initialDestinationsState,
        loaded: false,
        entities: {
          0: mockDestination,
        },
        ids: [mockDestination.id],
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createDestinationFailure should set error to error', () => {
      const error = new Error();
      const action = DestinationsActions.createDestinationFailure({ error });
      const expectedState = {
        ...initialDestinationsState,
        error,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteDestinationSuccess should add destination', () => {
      const prepAction = DestinationsActions.loadDestinationSuccess({
        destination: mockDestination,
      });
      const prepState: DestinationsState = destinationsReducer(
        initialDestinationsState,
        prepAction
      );

      const expectedState = {
        ...initialDestinationsState,
        loaded: true,
      };

      const action = DestinationsActions.deleteDestinationSuccess({
        destination: mockDestination,
      });
      const result: DestinationsState = destinationsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteDestinationFailure should set error to error', () => {
      const error = new Error();
      const action = DestinationsActions.deleteDestinationFailure({ error });
      const expectedState = {
        ...initialDestinationsState,
        error,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('selectDestination should set selectedId', () => {
      const action = DestinationsActions.selectDestination({
        selectedId: mockDestination.id,
      });
      const expectedState = {
        ...initialDestinationsState,
        selectedId: mockDestination.id,
      };

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedDestination should reset selectedId', () => {
      const prepAction = DestinationsActions.selectDestination({
        selectedId: mockDestination.id,
      });
      const prepState = destinationsReducer(
        initialDestinationsState,
        prepAction
      );

      const action = DestinationsActions.resetSelectedDestination();
      const expectedState = {
        ...initialDestinationsState,
        selectedId: null,
      };

      const result: DestinationsState = destinationsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetDestinations should reset destinations', () => {
      const prepAction = DestinationsActions.loadDestinationsSuccess({
        destinations,
      });
      const prepState: DestinationsState = destinationsReducer(
        initialDestinationsState,
        prepAction
      );

      const expectedState = {
        ...initialDestinationsState,
        loaded: true,
      };

      const action = DestinationsActions.resetDestinations();
      const result: DestinationsState = destinationsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: DestinationsState = destinationsReducer(
        initialDestinationsState,
        action
      );

      expect(result).toBe(initialDestinationsState);
    });
  });
});
