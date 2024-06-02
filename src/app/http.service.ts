import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './hotels-search-page/hotels-search-page.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  baseUrl: string = 'https://localhost:7119';

  fetchHotels(): Observable<any> {
    return this._http.get<Hotel>(this.baseUrl + '/api/hotels');
  }
}
