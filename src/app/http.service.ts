import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  // fetchHotels(searchParameters: any): Observable<any> {
  //   const queryParams = constructQueryParams(searchParameters);
  //   const params = new HttpParams({ fromObject: queryParams });
  //   return this._http.get<Hotel>('/hotels/search', { params });
  // }
}
