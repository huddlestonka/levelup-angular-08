import {
  clearForm,
  createTrip,
  deleteTrip,
  getTripDetailsTitle,
  getTripItem,
  getTrips,
  selectTrip,
  state,
  updateTrip,
} from '../../support/pages/trips.po';

describe('Trips', () => {
  const model = 'trips';
  let trips = null;

  before(() => {
    cy.fixture('trips').then((json) => (trips = json));
    cy.loadData(['trips']);
    cy.visit(state.route);
  });

  it('should be on the trips page', () => {
    cy.checkLocation(state.route);
  });

  it('should list all trips', () => {
    getTrips().should('have.length', trips.length);
  });

  it('should create a trip', () => {
    createTrip(model, state.newMockTrip);
    getTripItem(state.newMockTrip).should('exist');
  });

  it('should display a selected trip details', () => {
    clearForm();
    selectTrip(state.newMockTrip);
    getTripDetailsTitle().should(
      'contain.text',
      `Editing ${state.newMockTrip.title}`
    );
  });

  it('should clear trip details the form on cancel', () => {
    selectTrip(state.newMockTrip);
    clearForm();
    getTripDetailsTitle().should('contain.text', `Select Trip`);
  });

  it('should update a trip', () => {
    selectTrip(state.updatedMockTrip);
    updateTrip(model, state.updatedMockTrip);
    getTripItem(state.updatedMockTrip).should('exist');
  });

  it('should delete a trip', () => {
    deleteTrip(model, state.updatedMockTrip);
    getTripItem(state.updatedMockTrip).should('not.exist');
    getTrips().should('have.length', trips.length);
  });
});
