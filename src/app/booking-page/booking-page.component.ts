import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  booking!: Booking;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getBooking().subscribe((data: any) => {
      this.booking = data!;

      console.log(this.booking);
    });
  }
}
