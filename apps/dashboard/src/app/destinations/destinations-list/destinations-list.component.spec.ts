import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@bba/material';
import { DestinationsListComponent } from './destinations-list.component';

describe('DestinationsListComponent', () => {
  let component: DestinationsListComponent;
  let fixture: ComponentFixture<DestinationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationsListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
