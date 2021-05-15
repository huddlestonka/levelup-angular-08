import {
  DestinationsState,
  destinationsAdapter,
  initialDestinationsState,
} from './destinations.reducer';
import * as DestinationsSelectors from './destinations.selectors';

import { Destination } from '@bba/api-interfaces';
import { mockDestination } from '@bba/testing';

describe('Destinations Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDestinationsId = (it) => it['id'];
  const createDestination = (id: string, name = '') =>
    ({ ...mockDestination, id: id } as Destination);

  let state;

  beforeEach(() => {
    state = {
      destinations: destinationsAdapter.setAll(
        [
          createDestination('PRODUCT-AAA'),
          createDestination('PRODUCT-BBB'),
          createDestination('PRODUCT-CCC'),
        ],
        {
          ...initialDestinationsState,
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
      const result = DestinationsSelectors.getSelectedDestination(state);
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
