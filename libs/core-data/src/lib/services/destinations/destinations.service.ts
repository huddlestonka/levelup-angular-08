import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination } from '@bba/api-interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  model = 'destinations';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Destination[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Destination>(this.getUrlWithId(id));
  }

  create(destination: Destination) {
    return this.http.post(this.getUrl(), destination);
  }

  update(destination: Destination) {
    return this.http.put(this.getUrlWithId(destination.id), destination);
  }

  delete(destination: Destination) {
    return this.http.delete(this.getUrlWithId(destination.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
