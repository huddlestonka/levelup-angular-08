import { Trip } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockTripsFacade = {
  loadTrips: () => {},
  selectTrip: () => {},
  deleteTrip: () => {},
  updateTrip: () => {},
  createTrip: () => {},
  mutations$: of(true),
};

export const mockTripsService = {
  all: () => of([]),
  find: () => of({ ...mockTrip }),
  create: () => of({ ...mockTrip }),
  update: () => of({ ...mockTrip }),
  delete: () => of({ ...mockTrip }),
};

export const mockTrip = {
  id: '0',
  title: 'mock',
  description: 'mock',
  date: 'mock',
};

export const mockEmptyTrip = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
  date: 'mock',
};
