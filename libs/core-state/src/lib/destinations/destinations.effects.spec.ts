import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DestinationsEffects } from './destinations.effects';
import * as DestinationsActions from './destinations.actions';

describe('DestinationsEffects', () => {
  let actions: Observable<any>;
  let effects: DestinationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DestinationsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DestinationsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DestinationsActions.init() });

      const expected = hot('-a-|', {
        a: DestinationsActions.loadDestinationsSuccess({ destinations: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
