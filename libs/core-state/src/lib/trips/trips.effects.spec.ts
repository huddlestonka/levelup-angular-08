import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { TripsEffects } from './trips.effects';
import * as TripsActions from './trips.actions';
import { TripsService } from '@bba/core-data';

import { mockTripsService, mockTrip } from '@bba/testing';
import { Trip } from '@bba/api-interfaces';

describe('TripsEffects', () => {
  let actions: Observable<any>;
  let effects: TripsEffects;
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TripsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: TripsService, useValue: mockTripsService },
      ],
    });

    effects = TestBed.inject(TripsEffects);
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTrips$', () => {
    it('should return loadTripsSuccess, on success', () => {
      const trips: Trip[] = [];
      const action = TripsActions.loadTrips();
      const outcome = TripsActions.loadTripsSuccess({ trips });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: trips });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadTrips$).toBeObservable(expected);
    });

    it('should return loadTripsFailure, on failure', () => {
      const action = TripsActions.loadTrips();
      const error = new Error();
      const outcome = TripsActions.loadTripsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadTrips$).toBeObservable(expected);
    });
  });

  describe('loadTrip$', () => {
    it('should return success with trip', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.loadTrip({ tripId: trip.id });
      const outcome = TripsActions.loadTripSuccess({ trip });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: trip });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadTrip$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.loadTrip({ tripId: trip.id });
      const error = new Error();
      const outcome = TripsActions.loadTripFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadTrip$).toBeObservable(expected);
    });
  });

  describe('createTrip$', () => {
    it('should return success with trip', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.createTrip({ trip });
      const outcome = TripsActions.createTripSuccess({ trip });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: trip });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createTrip$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.createTrip({ trip });
      const error = new Error();
      const outcome = TripsActions.createTripFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createTrip$).toBeObservable(expected);
    });
  });

  describe('updateTrip$', () => {
    it('should return success with trip', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.updateTrip({ trip });
      const outcome = TripsActions.updateTripSuccess({ trip });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: trip });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateTrip$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.updateTrip({ trip });
      const error = new Error();
      const outcome = TripsActions.updateTripFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateTrip$).toBeObservable(expected);
    });
  });

  describe('deleteTrip$', () => {
    it('should return success with trip', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.deleteTrip({ trip });
      const outcome = TripsActions.deleteTripSuccess({ trip });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: trip });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteTrip$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const trip = { ...mockTrip };
      const action = TripsActions.deleteTrip({ trip });
      const error = new Error();
      const outcome = TripsActions.deleteTripFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteTrip$).toBeObservable(expected);
    });
  });
});
