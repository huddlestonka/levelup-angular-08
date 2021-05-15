import {
  getTripCardDestinations,
  getTripCardTitle,
  getTrips,
  state,
} from '../../support/pages/home.po';

import { getDestinationDeleteBtn } from '../../support/pages/destinations.po';

describe('Home', () => {
  let trips = null;
  let destinations = null;

  before(() => {
    cy.loadData(['trips', 'destinations']);
    cy.fixture('trips').then((json) => (trips = json));
    cy.fixture('destinations').then((json) => (destinations = json));
    cy.visit('/');
  });

  it('should be on the home page', () => {
    cy.checkLocation(state.route);
  });

  describe('Cards', () => {
    it('should list all trip cards', () => {
      getTrips().should('have.length', trips.length);
    });

    it('should have the correct trip title on each card', () => {
      trips.forEach((trip) => {
        getTripCardTitle(trip).should('contain.text', trip.title);
      });
    });

    it('should display the correct destinations for each trip', () => {
      trips.forEach((trip) => {
        const tripDestinations = destinations.filter(
          (destination) => destination.tripId === trip.id
        );
        getTripCardDestinations(trip).should(
          'have.length',
          tripDestinations.length
        );
      });
    });

    it('should display destinations as readonly', () => {
      destinations.forEach((destination) => {
        getDestinationDeleteBtn(destination).should('not.exist');
      });
    });
  });
});
