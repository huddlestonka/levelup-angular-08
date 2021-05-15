import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TripsFacade } from './trips.facade';
import * as TripsActions from './trips.actions';
import { initialTripsState } from './trips.reducer';

import { mockTrip } from '@bba/testing';

describe('TripsFacade', () => {
  let facade: TripsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TripsFacade,
        provideMockStore({ initialState: initialTripsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(TripsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = TripsActions.createTrip({ trip: mockTrip });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(trip.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectTrip(mockTrip.id);

      const action = TripsActions.selectTrip({
        selectedId: mockTrip.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadTrips on loadTrips()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadTrips();

      const action = TripsActions.loadTrips();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadTrip on loadTrip(trip.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadTrip(mockTrip.id);

      const action = TripsActions.loadTrip({ tripId: mockTrip.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createTrip on createTrip(trip)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createTrip(mockTrip);

      const action = TripsActions.createTrip({ trip: mockTrip });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateTrip on updateTrip(trip)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateTrip(mockTrip);

      const action = TripsActions.updateTrip({ trip: mockTrip });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteTrip(mockTrip);

      const action = TripsActions.deleteTrip({ trip: mockTrip });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
