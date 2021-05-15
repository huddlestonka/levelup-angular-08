import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DestinationsFacade } from './destinations.facade';
import * as DestinationsActions from './destinations.actions';
import { initialDestinationsState } from './destinations.reducer';

import { mockDestination } from '@bba/testing';

describe('DestinationsFacade', () => {
  let facade: DestinationsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DestinationsFacade,
        provideMockStore({ initialState: initialDestinationsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(DestinationsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = DestinationsActions.createDestination({
      destination: mockDestination,
    });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(destination.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectDestination(mockDestination.id);

      const action = DestinationsActions.selectDestination({
        selectedId: mockDestination.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadDestinations on loadDestinations()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadDestinations();

      const action = DestinationsActions.loadDestinations();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadDestination on loadDestination(destination.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadDestination(mockDestination.id);

      const action = DestinationsActions.loadDestination({
        destinationId: mockDestination.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createDestination on createDestination(destination)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createDestination(mockDestination);

      const action = DestinationsActions.createDestination({
        destination: mockDestination,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateDestination on updateDestination(destination)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateDestination(mockDestination);

      const action = DestinationsActions.updateDestination({
        destination: mockDestination,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteDestination(mockDestination);

      const action = DestinationsActions.deleteDestination({
        destination: mockDestination,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
