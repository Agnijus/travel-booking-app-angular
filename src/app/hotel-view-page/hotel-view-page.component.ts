import { Component, KeyValueDiffers } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentHotelService } from '../current-hotel.service';
import { SearchDataService } from '../search-data.service';
import { Hotel } from '../hotels-search-page/hotels-search-page.component';
import { CommonModule } from '@angular/common';
import { SearchData } from '../search-data.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../booking.service';
import { BookingPageComponent } from '../booking-page/booking-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-view-page',
  standalone: true,
  imports: [
    SearchBarComponent,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './hotel-view-page.component.html',
  styleUrl: './hotel-view-page.component.css',
})
export class HotelViewPageComponent {
  public searchParameters: SearchData | undefined;
  private differ: any;

  hotel!: Hotel;

  rooms: Room[] = [
    {
      display: 'Double Room (1 - 2 Adults)',
      maxGuestNumber: 2,
      priceMultiplier: 1.05,
    },

    {
      display: 'Twin Room (1 - 2 Adults)',
      maxGuestNumber: 2,
      priceMultiplier: 1.1,
    },
    {
      display: 'Quadruple Room (1 - 4 Adults)',
      maxGuestNumber: 4,
      priceMultiplier: 1.3,
    },
  ];

  filteredRooms: Room[] = [];

  totalDaysStay: number = 0;
  displayedColumns: string[] = ['display', 'guestNumber', 'totalPrice'];
  openDatePicker = false;

  constructor(
    private currentHotelService: CurrentHotelService,
    private searchDataService: SearchDataService,
    private bookingService: BookingService,
    private differs: KeyValueDiffers,
    private router: Router
  ) {
    this.differ = this.differs.find({}).create();
  }

  // get search params from service, calculate total days

  ngOnInit(): void {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
      this.totalDaysStay = this.calculateTotalDays();
      this.filterRooms();
    });

    this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
      this.hotel = data;
    });
  }

  // detect changes to date range & re-calculate total days

  ngDoCheck(): void {
    if (this.searchParameters) {
      const changes = this.differ.diff(this.searchParameters);
      if (changes) {
        changes.forEachChangedItem((record: any) => {
          if (record.key === 'checkInDate' || record.key === 'checkOutDate') {
            this.totalDaysStay = this.calculateTotalDays();
          }
          if (record.key == 'adultsCount') {
            this.filterRooms();
          }
        });
      }
    }
  }

  calculateTotalDays(): number {
    if (
      this.searchParameters?.checkInDate &&
      this.searchParameters?.checkOutDate
    ) {
      const checkInDate = new Date(this.searchParameters.checkInDate);
      const checkOutDate = new Date(this.searchParameters.checkOutDate);

      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      return Math.ceil(daysDifference);
    } else {
      return 0;
    }
  }

  filterRooms(): void {
    if (this.searchParameters && this.searchParameters.adultsCount) {
      this.filteredRooms = this.rooms.filter(
        (room) => room.maxGuestNumber >= this.searchParameters!.adultsCount
      );
    }
  }

  // scroll to top / activate datepicker method

  triggerDatePicker(open: boolean): void {
    if (open) {
      this.openDatePicker = false;

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        this.openDatePicker = true;
      }, 300);
    } else {
      this.openDatePicker = false;
    }
  }

  selectRoom(room: Room): void {
    const booking = {
      hotel: this.hotel,
      room: room,
      totalDays: this.totalDaysStay,
      totalPrice:
        this.totalDaysStay * room.priceMultiplier * this.hotel.pricePerNight,
      parameters: this.searchParameters,
    };
    this.bookingService.setBooking(booking);
    this.router.navigate(['/booking']);
  }
}

export interface Room {
  display: string;
  maxGuestNumber: number;
  priceMultiplier: number;
}
