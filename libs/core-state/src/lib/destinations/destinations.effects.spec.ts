import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { DestinationsEffects } from './destinations.effects';
import * as DestinationsActions from './destinations.actions';
import { DestinationsService } from '@bba/core-data';

import { mockDestinationsService, mockDestination } from '@bba/testing';
import { Destination } from '@bba/api-interfaces';

describe('DestinationsEffects', () => {
  let actions: Observable<any>;
  let effects: DestinationsEffects;
  let service: DestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DestinationsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: DestinationsService, useValue: mockDestinationsService },
      ],
    });

    effects = TestBed.inject(DestinationsEffects);
    service = TestBed.inject(DestinationsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadDestinations$', () => {
    it('should return loadDestinationsSuccess, on success', () => {
      const destinations: Destination[] = [];
      const action = DestinationsActions.loadDestinations();
      const outcome = DestinationsActions.loadDestinationsSuccess({
        destinations,
      });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: destinations });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadDestinations$).toBeObservable(expected);
    });

    it('should return loadDestinationsFailure, on failure', () => {
      const action = DestinationsActions.loadDestinations();
      const error = new Error();
      const outcome = DestinationsActions.loadDestinationsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadDestinations$).toBeObservable(expected);
    });
  });

  describe('loadDestination$', () => {
    it('should return success with destination', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.loadDestination({
        destinationId: destination.id,
      });
      const outcome = DestinationsActions.loadDestinationSuccess({
        destination,
      });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: destination });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadDestination$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.loadDestination({
        destinationId: destination.id,
      });
      const error = new Error();
      const outcome = DestinationsActions.loadDestinationFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadDestination$).toBeObservable(expected);
    });
  });

  describe('createDestination$', () => {
    it('should return success with destination', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.createDestination({ destination });
      const outcome = DestinationsActions.createDestinationSuccess({
        destination,
      });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: destination });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createDestination$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.createDestination({ destination });
      const error = new Error();
      const outcome = DestinationsActions.createDestinationFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createDestination$).toBeObservable(expected);
    });
  });

  describe('updateDestination$', () => {
    it('should return success with destination', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.updateDestination({ destination });
      const outcome = DestinationsActions.updateDestinationSuccess({
        destination,
      });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: destination });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateDestination$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.updateDestination({ destination });
      const error = new Error();
      const outcome = DestinationsActions.updateDestinationFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateDestination$).toBeObservable(expected);
    });
  });

  describe('deleteDestination$', () => {
    it('should return success with destination', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.deleteDestination({ destination });
      const outcome = DestinationsActions.deleteDestinationSuccess({
        destination,
      });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: destination });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteDestination$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const destination = { ...mockDestination };
      const action = DestinationsActions.deleteDestination({ destination });
      const error = new Error();
      const outcome = DestinationsActions.deleteDestinationFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteDestination$).toBeObservable(expected);
    });
  });
});
