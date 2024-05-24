import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from './hotels-search-page/hotels-search-page.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentHotelService {
  private currentHotel!: Hotel;

  constructor() {}

  setCurrentHotel(hotel: Hotel): void {
    this.currentHotel = hotel;
  }

  getCurrentHotel(): Observable<Hotel> {
    return of(this.currentHotel);
  }
}
