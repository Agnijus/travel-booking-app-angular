import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from './hotels-search-page/hotels-search-page.component';
import { Room } from './hotel-view-page/hotel-view-page.component';
import { SearchData } from './search-data.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private booking!: Booking;

  constructor() {}

  setBooking(booking: Booking): void {
    this.booking = booking;
  }

  getBooking(): Observable<Booking> {
    return of(this.booking);
  }
}

export interface Booking {
  hotel: Hotel;
  room: Room;
  totalDays: number;
  totalPrice: number;
  parameters: SearchData | undefined;
}
