import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  bookingSummary!: Booking;
  baseUrl: string = 'https://localhost:5000/';

  guestDetailsForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(
    private bookingService: BookingService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingService.getBooking().subscribe((data: any) => {
      this.bookingSummary = data!;

      console.log(this.bookingSummary);
    });
  }

  book(): void {
    if (this.guestDetailsForm.valid) {
      const guestAccountHotelBooking = {
        ...this.guestDetailsForm.value,
        ...this.bookingSummary,
      };
      console.log(guestAccountHotelBooking);

      this.http.postHotelBooking(guestAccountHotelBooking).subscribe({
        next: (data: HotelBooking) => {
          console.log(data);
          this.router.navigate(['booking/result']);
        },
        error: (error) => console.log(error),
      });
    }
  }
}

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface HotelBooking {
  id: number;
  accountId: number;
  bookingId: number;
  totalPrice: number;
  status: number;
}
