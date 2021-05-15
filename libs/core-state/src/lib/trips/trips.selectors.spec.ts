import { TripsState, tripsAdapter, initialTripsState } from './trips.reducer';
import * as TripsSelectors from './trips.selectors';

import { Trip } from '@bba/api-interfaces';
import { mockTrip } from '@bba/testing';

describe('Trips Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTripsId = (it) => it['id'];
  const createTrip = (id: string, name = '') =>
    ({ ...mockTrip, id: id } as Trip);

  let state;

  beforeEach(() => {
    state = {
      trips: tripsAdapter.setAll(
        [
          createTrip('PRODUCT-AAA'),
          createTrip('PRODUCT-BBB'),
          createTrip('PRODUCT-CCC'),
        ],
        {
          ...initialTripsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Trips Selectors', () => {
    it('getAllTrips() should return the list of Trips', () => {
      const results = TripsSelectors.getAllTrips(state);
      const selId = getTripsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TripsSelectors.getSelectedTrip(state);
      const selId = getTripsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getTripsLoaded() should return the current 'loaded' status", () => {
      const result = TripsSelectors.getTripsLoaded(state);

      expect(result).toBe(true);
    });

    it("getTripsError() should return the current 'error' state", () => {
      const result = TripsSelectors.getTripsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
