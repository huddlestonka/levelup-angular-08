import { DestinationsEntity } from './destinations.models';
import {
  State,
  destinationsAdapter,
  initialState,
} from './destinations.reducer';
import * as DestinationsSelectors from './destinations.selectors';

describe('Destinations Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDestinationsId = (it) => it['id'];
  const createDestinationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DestinationsEntity);

  let state;

  beforeEach(() => {
    state = {
      destinations: destinationsAdapter.setAll(
        [
          createDestinationsEntity('PRODUCT-AAA'),
          createDestinationsEntity('PRODUCT-BBB'),
          createDestinationsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Destinations Selectors', () => {
    it('getAllDestinations() should return the list of Destinations', () => {
      const results = DestinationsSelectors.getAllDestinations(state);
      const selId = getDestinationsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DestinationsSelectors.getSelected(state);
      const selId = getDestinationsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDestinationsLoaded() should return the current 'loaded' status", () => {
      const result = DestinationsSelectors.getDestinationsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDestinationsError() should return the current 'error' state", () => {
      const result = DestinationsSelectors.getDestinationsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
