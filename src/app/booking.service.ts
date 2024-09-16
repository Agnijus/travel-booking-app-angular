import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchData } from './search-data.service';
import {
  HotelViewResult,
  RoomViewResults,
} from './hotel-view-page/hotel-view-page.component';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private booking!: any;

  constructor() {}

  setBooking(booking: any): void {
    this.booking = booking;
  }

  getBooking(): Observable<any> {
    return of(this.booking);
  }
}

export interface Room {
  id: number;
  title?: string;
  maxGuestNumber?: number;
  roomType: number;
  pricePerNight: number;
}

export interface Booking {
  hotel: HotelViewResult;
  room: RoomViewResults;
  totalDays: number;
  totalPrice: number;
  parameters: SearchData | undefined;
}
