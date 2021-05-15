import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Destination } from '@bba/api-interfaces';

import { DestinationsService } from './destinations.service';

import { mockDestination } from '@bba/testing';

describe('DestinationsService', () => {
  const model = 'destinations';
  let httpTestingController: HttpTestingController;
  let service: DestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockDestination);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockDestination]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockDestination.id).subscribe((res) => {
        expect(res).toEqual(mockDestination);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockDestination.id)
      );
      req.flush(mockDestination);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockDestination).subscribe((res) => {
        expect(res).toEqual(mockDestination);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockDestination);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockDestination).subscribe((res) => {
        expect(res).toEqual(mockDestination);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockDestination.id)
      );
      req.flush(mockDestination);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockDestination).subscribe((res) => {
        expect(res).toEqual(mockDestination);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockDestination.id)
      );
      req.flush(mockDestination);
      httpTestingController.verify();
    });
  });
});
