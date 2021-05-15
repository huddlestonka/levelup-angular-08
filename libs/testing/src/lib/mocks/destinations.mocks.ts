import { Destination } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockDestinationsFacade = {
  loadDestinations: () => {},
  selectDestination: () => {},
  deleteDestination: () => {},
  updateDestination: () => {},
  createDestination: () => {},
  mutations$: of(true),
};

export const mockDestinationsService = {
  all: () => of([]),
  find: () => of({ ...mockDestination }),
  create: () => of({ ...mockDestination }),
  update: () => of({ ...mockDestination }),
  delete: () => of({ ...mockDestination }),
};

export const mockDestination = {
  id: '0',
  title: 'mock',
  description: 'mock',
  date: 'mock',
  tripId: 'mock',
};

export const mockEmptyDestination = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
  date: 'mockEmpty',
  tripId: 'mockEmpty',
};
