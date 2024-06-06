import { Routes } from '@angular/router';
import { HotelsPageComponent } from './hotels-page/hotels-page.component';
import { FlightsPageComponent } from './flights-page/flights-page.component';
import { CarhirePageComponent } from './carhire-page/carhire-page.component';
import { HotelsSearchPageComponent } from './hotels-search-page/hotels-search-page.component';
import { HotelViewPageComponent } from './hotel-view-page/hotel-view-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingResultPageComponent } from './booking-result-page/booking-result-page.component';
export const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'flights', component: FlightsPageComponent },
  {
    path: 'hotels',
    component: HotelsPageComponent,
    data: { showSearchBar: true },
  },
  { path: 'carhire', component: CarhirePageComponent },
  {
    path: 'hotels/search',
    component: HotelsSearchPageComponent,
    data: { showSearchBar: true },
  },
  {
    path: 'hotels/view/:id',
    component: HotelViewPageComponent,
    data: { showSearchBar: true },
  },
  {
    path: 'booking',
    component: BookingPageComponent,
    data: { showSearchBar: true },
  },
  {
    path: 'booking/result',
    component: BookingResultPageComponent,
    data: { showSearchBar: true },
  },
];
