import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '@bba/api-interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  model = 'trips';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Trip[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Trip>(this.getUrlWithId(id));
  }

  create(trip: Trip) {
    return this.http.post(this.getUrl(), trip);
  }

  update(trip: Trip) {
    return this.http.put(this.getUrlWithId(trip.id), trip);
  }

  delete(trip: Trip) {
    return this.http.delete(this.getUrlWithId(trip.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
