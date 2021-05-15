export const state = {
  route: '/',
};

export const getTripCards = () => cy.get('[data-cy=home-trip-cards]');

export const getTrips = () => cy.get('[data-cy=home-trip-cards]>mat-card');

export const getTripCardTitle = (trip) =>
  cy.get(`[data-cy=home-trip-${trip.id}-title]`);

export const getTripCardDestinations = (trip) =>
  cy.get(`[data-cy=home-trip-${trip.id}-title]`);

export const getTripCardDate = (trip) =>
  cy.get(`[data-cy=home-trip-${trip.date}-title]`);

export const getTripCardDestinationItem = (destination) =>
  cy.get(`[data-cy=destination=${destination.id}-item]`);

export const checkTripsDisplayed = (trips) => {
  getTrips().should('have.length', trips.length);
};

export const checkTripTitles = (trips) => {
  trips.forEach((trip) => {
    getTripCardTitle(trip).should('contain.text', trip.title);
  });
};

export const checkTripDestinations = (trips, destinations) => {
  trips.forEach((trip) => {
    const tripDestinations = destinations.filter(
      (destination) => destination.tripId === trip.id
    );
    getTripCardDestinations(trip).should(
      'have.length',
      tripDestinations.length
    );
  });
};
