import { Routes } from '@angular/router';
import { HotelsPageComponent } from './hotels-page/hotels-page.component';
import { FlightsPageComponent } from './flights-page/flights-page.component';
import { CarhirePageComponent } from './carhire-page/carhire-page.component';
import { HotelsSearchPageComponent } from './hotels-search-page/hotels-search-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'flights', component: FlightsPageComponent },
  { path: 'hotels', component: HotelsPageComponent },
  { path: 'carhire', component: CarhirePageComponent },
  { path: 'hotels/search', component: HotelsSearchPageComponent },
];
