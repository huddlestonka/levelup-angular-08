import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, DestinationsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { DestinationsListComponent } from './destinations-list/destinations-list.component';
import { DestinationsComponent } from './destinations.component';

import { mockDestination, mockEmptyDestination } from '@bba/testing';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;
  let de: DebugElement;
  let destinationsFacade: DestinationsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DestinationsComponent,
        DestinationDetailsComponent,
        DestinationsListComponent,
      ],
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
    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    destinationsFacade = TestBed.inject(DestinationsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call destinationsFacade selectDestination', () => {
    const spy = jest.spyOn(destinationsFacade, 'selectDestination');

    component.selectDestination(mockDestination);

    expect(spy).toHaveBeenCalledWith(mockDestination.id);
  });

  describe('should on save call destinationsFacade', () => {
    it('updateDestination', () => {
      const spy = jest.spyOn(destinationsFacade, 'updateDestination');

      component.saveDestination(mockDestination);

      expect(spy).toHaveBeenCalledWith(mockDestination);
    });

    it('createDestination', () => {
      const spy = jest.spyOn(destinationsFacade, 'createDestination');

      component.saveDestination(mockEmptyDestination);

      expect(spy).toHaveBeenCalledWith(mockEmptyDestination);
    });
  });

  it('should on delete call destinationsFacade deleteDestination', () => {
    const spy = jest.spyOn(destinationsFacade, 'deleteDestination');

    component.deleteDestination(mockDestination);

    expect(spy).toHaveBeenCalledWith(mockDestination);
  });
});
