export const state = {
  route: '/trips',
  homeRoute: '/',
  newMockTrip: {
    id: 'E2E_TRIP_ID',
    title: 'E2E Mock Trip',
    description: 'E2E Mock Description',
    date: 'E2E Mock Date',
  },
  updatedMockTrip: {
    id: 'E2E_TRIP_ID',
    title: 'E2E Mock Trip!!',
    description: 'E2E Mock Description Updated',
    date: 'E2E Mock Date',
  },
};

export const getTripsList = () => cy.get('[data-cy=trips-list]');

export const getTrips = () => cy.get('[data-cy=trips-list]>mat-list-item');

export const getTripItem = (trip) => cy.get(`[data-cy=trip-${trip.id}-item]`);

export const getTripTitle = (trip) =>
  cy.get(`[data-cy=trip-${trip.id}-item-title]`);

export const getTripDate = (trip) =>
  cy.get(`[data-cy=trip-${trip.date}-item-title]`);

export const getTripDeleteBtn = (trip) =>
  cy.get(`[data-cy=delete-trip-${trip.id}-btn]`);

export const getTripDetailsTitle = () => cy.get('[data-cy=trip-details-title]');

export const selectTrip = (trip) => getTripItem(trip).click();

export const clearForm = () => cy.get('[data-cy=trip-form-cancel]').click();

export const completeNewTripForm = (trip) => {
  cy.get(`[data-cy=trip-form-title]`).type(trip.title, { delay: 20 });
  cy.get(`[data-cy=trip-form-description]`).type(trip.description, {
    delay: 20,
  });
  cy.get(`[data-cy=trip-form-date]`).type(trip.date, {
    delay: 20,
  });
  cy.get('[data-cy=trip-form-save]').click();
};

export const completeUpdateTripForm = (trip) => {
  cy.get(`[data-cy=trip-form-title]`)
    .clear()
    .type(`${trip.title}!!`, { delay: 20 });
  cy.get(`[data-cy=trip-form-description]`)
    .clear()
    .type(`${trip.description} updated`, { delay: 20 });
  cy.get(`[data-cy=trip-form-date]`)
    .clear()
    .type(`${trip.date} updated`, { delay: 20 });
  cy.get('[data-cy=trip-form-save]').click();
};

export const createTrip = (model, trip) => {
  cy.createEntity(model, trip);
  completeNewTripForm(trip);
};

export const updateTrip = (model, trip) => {
  cy.updateEntity(model, trip);
  completeUpdateTripForm(trip);
};

export const deleteTrip = (model, trip) => {
  cy.deleteEntity(model, trip);
  getTripDeleteBtn(trip).click();
};

export const checkTripDetailsTitle = (title) => {
  getTripDetailsTitle().should('contain.text', title);
};

export const checkTripsLength = (trips) => {
  getTrips().should('have.length', trips.length);
};

export const checkTrip = (trip, exists = true) => {
  const condition = exists ? 'exist' : 'not.exist';
  getTripItem(trip).should(condition);
};
