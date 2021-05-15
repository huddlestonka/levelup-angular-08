import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TripsEntity } from './trips.models';
import { TripsEffects } from './trips.effects';
import { TripsFacade } from './trips.facade';

import * as TripsSelectors from './trips.selectors';
import * as TripsActions from './trips.actions';
import {
  TRIPS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './trips.reducer';

interface TestSchema {
  trips: State;
}

describe('TripsFacade', () => {
  let facade: TripsFacade;
  let store: Store<TestSchema>;
  const createTripsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TripsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRIPS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TripsEffects]),
        ],
        providers: [TripsFacade],
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
      facade = TestBed.inject(TripsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allTrips$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allTrips$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTripsSuccess` to manually update list
     */
    it('allTrips$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allTrips$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          TripsActions.loadTripsSuccess({
            trips: [createTripsEntity('AAA'), createTripsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allTrips$);
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
