import { TripsEntity } from './trips.models';
import * as TripsActions from './trips.actions';
import { State, initialState, reducer } from './trips.reducer';

describe('Trips Reducer', () => {
  const createTripsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TripsEntity);

  beforeEach(() => {});

  describe('valid Trips actions', () => {
    it('loadTripsSuccess should return set the list of known Trips', () => {
      const trips = [
        createTripsEntity('PRODUCT-AAA'),
        createTripsEntity('PRODUCT-zzz'),
      ];
      const action = TripsActions.loadTripsSuccess({ trips });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
