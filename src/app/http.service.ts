import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constructQueryParams } from './hotels-query-helper';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  fetchHotels(searchParameters: any): Observable<any> {
    const queryParams = constructQueryParams(searchParameters);
    const params = new HttpParams({ fromObject: queryParams });
    return this._http.get<Hotel>('/hotels/search', { params });
  }
}

export interface Hotel {
  name: string;
  image: string;
  distanceFromLandmark: string;
  starRating: number;
  userRating: number;
  reviewCount: number;
  locationRating: number;
  pricePerNight: number;
  totalStayPrice: number;
}
