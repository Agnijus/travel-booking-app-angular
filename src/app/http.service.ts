import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Hotel } from './hotels-search-page/hotels-search-page.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient, private route: ActivatedRoute) {}

  baseUrl: string = 'https://localhost:5000';

  fetchPopularDestinations(): Observable<any> {
    return this._http.get(this.baseUrl + '/api/popularDestinations');
  }

  fetchHotelsByDestination(destination: any): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/api/hotels/destination/${destination}`
    );
  }

  fetchHotels(): Observable<any> {
    return this._http.get<Hotel>(this.baseUrl + '/api/hotels');
  }

  fetchHotelById(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/api/hotels/${id}`);
  }

  postHotelBooking(guestAccountHotelBooking: any): Observable<any> {
    return this._http.post(
      `${this.baseUrl}/api/booking`,
      guestAccountHotelBooking
    );
  }
}
