import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatDividerModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  // booking: Booking | undefined;

  booking = {
    hotel: {
      id: 1,
      name: 'Conrad Las Vegas at Resorts World',
      imageUrl: [
        'https://content.skyscnr.com/available/1395012434/1395012434_WxH.jpg',
        'https://content.skyscnr.com/available/1303344146/1303344146_WxH.jpg',
        'https://content.skyscnr.com/available/1215563226/1215563226_320x252.jpg',
      ],
      address:
        '111 Resorts World Avenue, Downtown Las Vegas, Las Vegas, 89109, United States',
      distance: 0.8,
      rating: 5,
      guestRating: 3,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 731,
      pricePerNight: 120,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    room: {
      display: 'Quadruple Room (1 - 4 Adults)',
      maxGuestNumber: 4,
      priceMultiplier: 1.3,
    },
    totalDays: 8,
    totalPrice: 1248,
    parameters: {
      destination: 'Las Vegas',
      checkInDate: '2024-06-06T14:33:07.385Z',
      checkOutDate: '2024-06-14T14:33:07.385Z',
      adultsCount: 2,
      childrenCount: 0,
      roomsCount: 1,
      isCancellationFree: false,
      isFourStars: false,
      isThreeStars: false,
    },
  };

  constructor(private bookingService: BookingService) {}

  // ngOnInit(): void {
  //   this.bookingService.getBooking().subscribe((data: any) => {
  //     this.booking = data!;

  //     console.log(this.booking);
  //   });
  // }
}
