import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TripsEffects } from './trips.effects';
import * as TripsActions from './trips.actions';

describe('TripsEffects', () => {
  let actions: Observable<any>;
  let effects: TripsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TripsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TripsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TripsActions.init() });

      const expected = hot('-a-|', {
        a: TripsActions.loadTripsSuccess({ trips: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
