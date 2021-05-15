import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trips/trip-details/trip-details.component';
import { TripsListComponent } from './trips/trips-list/trips-list.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationDetailsComponent } from './destinations/destination-details/destination-details.component';
import { DestinationsListComponent } from './destinations/destinations-list/destinations-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, TripsComponent, TripDetailsComponent, TripsListComponent, DestinationsComponent, DestinationDetailsComponent, DestinationsListComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
