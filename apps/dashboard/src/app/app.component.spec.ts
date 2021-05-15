import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent, SidenavStatus } from './app.component';
import { UiToolbarModule } from '@bba/ui-toolbar';
import { MaterialModule } from '@bba/material';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        UiToolbarModule,
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('should toggle sidenavStatus on toolbar event-toggleSidenav', () => {
    it('to closed, assumed open on init', () => {
      const spy = jest.spyOn(component, 'toggleSidenav');
      const toolbar = de.query(By.css('bba-toolbar'));

      toolbar.triggerEventHandler('toggleSidenav', null);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.sidenavStatus).toBe(SidenavStatus.CLOSED);
    });

    it('to open, set to closed on start', () => {
      const spy = jest.spyOn(component, 'toggleSidenav');
      const toolbar = de.query(By.css('bba-toolbar'));

      component.sidenavStatus = SidenavStatus.CLOSED;

      toolbar.triggerEventHandler('toggleSidenav', null);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.sidenavStatus).toBe(SidenavStatus.OPENED);
    });
  });
});
