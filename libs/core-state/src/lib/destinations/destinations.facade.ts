import { Injectable } from '@angular/core';
import { Destination } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as DestinationsActions from './destinations.actions';
import * as fromDestinations from './destinations.reducer';
import * as DestinationsSelectors from './destinations.selectors';

@Injectable({
  providedIn: 'root',
})
export class DestinationsFacade {
  loaded$ = this.store.pipe(
    select(DestinationsSelectors.getDestinationsLoaded)
  );
  allDestinations$ = this.store.pipe(
    select(DestinationsSelectors.getAllDestinations)
  );
  selectedDestination$ = this.store.pipe(
    select(DestinationsSelectors.getSelectedDestination)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === DestinationsActions.createDestination({} as any).type ||
        action.type === DestinationsActions.updateDestination({} as any).type ||
        action.type === DestinationsActions.deleteDestination({} as any).type
    )
  );

  constructor(
    private store: Store<fromDestinations.DestinationsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectDestination(selectedId: string) {
    this.dispatch(DestinationsActions.selectDestination({ selectedId }));
  }

  loadDestinations() {
    this.dispatch(DestinationsActions.loadDestinations());
  }

  loadDestination(destinationId: string) {
    this.dispatch(DestinationsActions.loadDestination({ destinationId }));
  }

  createDestination(destination: Destination) {
    // We are generate the UUID at the client because of a sqlite limitation
    this.dispatch(
      DestinationsActions.createDestination({
        destination: Object.assign({}, destination, { id: uuidv4() }),
      })
    );
  }

  updateDestination(destination: Destination) {
    this.dispatch(DestinationsActions.updateDestination({ destination }));
  }

  deleteDestination(destination: Destination) {
    this.dispatch(DestinationsActions.deleteDestination({ destination }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
