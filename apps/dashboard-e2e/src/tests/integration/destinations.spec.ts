import {
  clearForm,
  completeNewDestinationForm,
  completeUpdateDestinationForm,
  getDestinationDeleteBtn,
  getDestinationDetailsTitle,
  getDestinationItem,
  getDestinations,
  selectDestination,
  state,
} from '../../support/pages/destinations.po';

describe('Destinations', () => {
  const model = 'destinations';
  let destinations = null;

  before(() => {
    cy.fixture('destinations').then((json) => (destinations = json));
    cy.loadData(['trips', 'destinations']);
    cy.visit(state.route);
  });

  it('should be on the destinations page', () => {
    cy.checkLocation(state.route);
  });

  it('should list all destinations', () => {
    getDestinations().should('have.length', destinations.length);
  });

  it('should create a destination', () => {
    cy.createEntity(model, state.newMockDestination);
    cy.loadData(['trips']);
    completeNewDestinationForm(state.newMockDestination);
    getDestinationItem(state.newMockDestination).should('exist');
  });

  it('should display a selected destination details', () => {
    clearForm();
    selectDestination(state.newMockDestination);
    getDestinationDetailsTitle().should(
      'contain.text',
      `Editing ${state.newMockDestination.title}`
    );
  });

  it('should clear destination details the form on cancel', () => {
    selectDestination(state.newMockDestination);
    clearForm();
    getDestinationDetailsTitle().should('contain.text', `Select Destination`);
  });

  it('should update a destination', () => {
    cy.updateEntity(model, state.updatedMockDestination);
    cy.loadData(['trips']);
    selectDestination(state.updatedMockDestination);
    completeUpdateDestinationForm(state.updatedMockDestination);
    getDestinationItem(state.updatedMockDestination).should('exist');
  });

  it('should delete a destination', () => {
    cy.deleteEntity(model, state.updatedMockDestination);
    cy.loadData(['trips']);
    getDestinationDeleteBtn(state.updatedMockDestination).click();
    getDestinationItem(state.updatedMockDestination).should('not.exist');
    getDestinations().should('have.length', destinations.length);
  });
});
