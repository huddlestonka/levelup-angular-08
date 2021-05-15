import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Trip } from '@bba/api-interfaces';

import { TripsService } from './trips.service';

import { mockTrip } from '@bba/testing';

describe('TripsService', () => {
  const model = 'trips';
  let httpTestingController: HttpTestingController;
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockTrip);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockTrip]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockTrip.id).subscribe((res) => {
        expect(res).toEqual(mockTrip);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockTrip.id)
      );
      req.flush(mockTrip);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockTrip).subscribe((res) => {
        expect(res).toEqual(mockTrip);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockTrip);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockTrip).subscribe((res) => {
        expect(res).toEqual(mockTrip);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockTrip.id)
      );
      req.flush(mockTrip);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockTrip).subscribe((res) => {
        expect(res).toEqual(mockTrip);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockTrip.id)
      );
      req.flush(mockTrip);
      httpTestingController.verify();
    });
  });
});
