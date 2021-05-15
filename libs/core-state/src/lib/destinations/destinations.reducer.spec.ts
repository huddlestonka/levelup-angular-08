import { DestinationsEntity } from './destinations.models';
import * as DestinationsActions from './destinations.actions';
import { State, initialState, reducer } from './destinations.reducer';

describe('Destinations Reducer', () => {
  const createDestinationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DestinationsEntity);

  beforeEach(() => {});

  describe('valid Destinations actions', () => {
    it('loadDestinationsSuccess should return set the list of known Destinations', () => {
      const destinations = [
        createDestinationsEntity('PRODUCT-AAA'),
        createDestinationsEntity('PRODUCT-zzz'),
      ];
      const action = DestinationsActions.loadDestinationsSuccess({
        destinations,
      });

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
