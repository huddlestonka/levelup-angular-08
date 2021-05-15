export const state = {
  route: '/destinations',
  homeRoute: '/',
  newMockDestination: {
    id: 'E2E_DESTINATION_ID',
    title: 'E2E Mock Destination',
    description: 'E2E Mock Description',
    date: 'E2E Mock Date',
  },
  updatedMockDestination: {
    id: 'E2E_DESTINATION_ID',
    title: 'E2E Mock Destination!!',
    description: 'E2E Mock Description Updated',
    date: 'E2E Mock Date',
  },
};

export const getDestinationsList = () => cy.get('[data-cy=destinations-list]');

export const getDestinations = () =>
  cy.get('[data-cy=destinations-list]>mat-list-item');

export const getDestinationItem = (destination) =>
  cy.get(`[data-cy=destination-${destination.id}-item]`);

export const getDestinationTitle = (destination) =>
  cy.get(`[data-cy=destination-${destination.id}-item-title]`);

export const getDestinationDeleteBtn = (destination) =>
  cy.get(`[data-cy=delete-destination-${destination.id}-btn]`);

export const getDestinationDetailsTitle = () =>
  cy.get('[data-cy=destination-details-title]');

export const selectDestination = (destination) =>
  getDestinationItem(destination).click();

export const clearForm = () =>
  cy.get('[data-cy=destination-form-cancel').click();

export const completeNewDestinationForm = (destination) => {
  cy.get(`[data-cy=destination-form-title]`).type(destination.title, {
    delay: 20,
  });
  cy.get(`[data-cy=destination-form-description]`).type(
    destination.description,
    {
      delay: 20,
    }
  );
  cy.get(`[data-cy=destination-form-date]`).type(destination.date, {
    delay: 20,
  });
  cy.get('[data-cy=destination-form-save]').click();
};

export const completeUpdateDestinationForm = (destination) => {
  cy.get(`[data-cy=destination-form-title]`)
    .clear()
    .type(`${destination.title}!!`, { delay: 20 });
  cy.get(`[data-cy=destination-form-description]`)
    .clear()
    .type(`${destination.description} updated`, { delay: 20 });
  cy.get(`[data-cy=destination-form-date]`)
    .clear()
    .type(`${destination.date} updated`, { delay: 20 });
  cy.get('[data-cy=destination-form-save]').click();
};

export const createDestination = (model, destination) => {
  cy.createEntity(model, destination);
  completeNewDestinationForm(destination);
};

export const updateDestination = (model, destination) => {
  cy.updateEntity(model, destination);
  completeUpdateDestinationForm(destination);
};

export const deleteDestination = (model, destination) => {
  cy.deleteEntity(model, destination);
  getDestinationDeleteBtn(destination).click();
};

export const checkDestinationsReadOnly = (destinations) => {
  destinations.forEach((destination) => {
    getDestinationDeleteBtn(destination).should('not.exist');
  });
};

export const checkDestinationDetailsTitle = (title) => {
  getDestinationDetailsTitle().should('contain.text', title);
};

export const checkDestinationsLength = (destinations) => {
  getDestinations().should('have.length', destinations.length);
};

export const checkDestination = (destination, exists = true) => {
  const condition = exists ? 'exist' : 'not.exist';
  getDestinationItem(destination).should(condition);
};
