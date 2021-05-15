import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, TripsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripsComponent } from './trips.component';

import { mockTrip, mockEmptyTrip } from '@bba/testing';

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let de: DebugElement;
  let tripsFacade: TripsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TripsComponent, TripDetailsComponent, TripsListComponent],
      imports: [
        CoreDataModule,
        CoreStateModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    tripsFacade = TestBed.inject(TripsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call tripsFacade selectTrip', () => {
    const spy = jest.spyOn(tripsFacade, 'selectTrip');

    component.selectTrip(mockTrip);

    expect(spy).toHaveBeenCalledWith(mockTrip.id);
  });

  describe('should on save call tripsFacade', () => {
    it('updateTrip', () => {
      const spy = jest.spyOn(tripsFacade, 'updateTrip');

      component.saveTrip(mockTrip);

      expect(spy).toHaveBeenCalledWith(mockTrip);
    });

    it('createTrip', () => {
      const spy = jest.spyOn(tripsFacade, 'createTrip');

      component.saveTrip(mockEmptyTrip);

      expect(spy).toHaveBeenCalledWith(mockEmptyTrip);
    });
  });

  it('should on delete call tripsFacade deleteTrip', () => {
    const spy = jest.spyOn(tripsFacade, 'deleteTrip');

    component.deleteTrip(mockTrip);

    expect(spy).toHaveBeenCalledWith(mockTrip);
  });
});
