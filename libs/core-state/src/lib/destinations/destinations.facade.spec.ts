import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DestinationsEntity } from './destinations.models';
import { DestinationsEffects } from './destinations.effects';
import { DestinationsFacade } from './destinations.facade';

import * as DestinationsSelectors from './destinations.selectors';
import * as DestinationsActions from './destinations.actions';
import {
  DESTINATIONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './destinations.reducer';

interface TestSchema {
  destinations: State;
}

describe('DestinationsFacade', () => {
  let facade: DestinationsFacade;
  let store: Store<TestSchema>;
  const createDestinationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DestinationsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DESTINATIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DestinationsEffects]),
        ],
        providers: [DestinationsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DestinationsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDestinations$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allDestinations$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDestinationsSuccess` to manually update list
     */
    it('allDestinations$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDestinations$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DestinationsActions.loadDestinationsSuccess({
            destinations: [
              createDestinationsEntity('AAA'),
              createDestinationsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allDestinations$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
