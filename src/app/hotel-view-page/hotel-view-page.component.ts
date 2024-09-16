import { Component, KeyValueDiffers } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchDataService } from '../search-data.service';
import { CommonModule } from '@angular/common';
import { SearchData } from '../search-data.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

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
  hotel!: any;
  baseUrl: string = 'https://localhost:5000/';

  filteredRooms: RoomViewResults[] = [];
  rooms: any[] = [];

  totalDaysStay: number = 0;
  displayedColumns: string[] = ['display', 'guestNumber', 'totalPrice'];
  openDatePicker = false;

  constructor(
    private http: HttpService,
    private searchDataService: SearchDataService,
    private bookingService: BookingService,
    private differs: KeyValueDiffers,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.differ = this.differs.find({}).create();
  }

  // get search params from service, calculate total days

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      this.http.fetchHotelById(id).subscribe({
        next: (apiResponse: any) => {
          if (apiResponse.statusCode === 200) {
            this.hotel = apiResponse.data;
            this.rooms = this.hotel.rooms.map((room: RoomViewResults) => {
              const roomDetails = ROOM_TYPE_DETAILS[room.description];
              return roomDetails ? { ...room, ...roomDetails } : room;
            });
            console.log(this.rooms);
          }
          this.searchDataService.getSearchData().subscribe((data: any) => {
            this.searchParameters = data!;
            this.totalDaysStay = this.calculateTotalDays();
            this.filterRooms();
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
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
    console.log(this.searchParameters, this.rooms);
    if (this.searchParameters && this.searchParameters.adultsCount) {
      this.filteredRooms = this.rooms.filter(
        (room) => room.maxGuestNumber === this.searchParameters!.adultsCount
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

  selectRoom(room: any): void {
    const booking: any = {
      hotel: this.hotel,
      room: room,
      totalDays: this.totalDaysStay,
      totalPrice: this.totalDaysStay * room.pricePerNight,
      parameters: this.searchParameters,
    };
    this.bookingService.setBooking(booking);
    console.log(booking);
    this.router.navigate(['/booking']);
  }
}

export interface HotelViewResult {
  hotelId: number;
  title: string;
  address: string;
  city: string;
  distance: number;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  hasFreeCancellation: boolean;
  hasPayOnArrival: boolean;
  imagePaths: string[];
  rooms: RoomViewResults[];
}

export interface RoomViewResults {
  roomTypeId: number;
  description: number;
  pricePerNight: number;
  title: string;
}

interface RoomTypeDetails {
  title: string;
  maxGuestNumber: number;
  description: string;
}

const ROOM_TYPE_DETAILS: { [description: string]: RoomTypeDetails } = {
  SingleRoom: {
    title: 'Single Room (1 Adult)',
    maxGuestNumber: 1,
    description: 'SingleRoom',
  },
  DoubleRoom: {
    title: 'Double Room (2 Adults)',
    maxGuestNumber: 2,
    description: 'DoubleRoom',
  },
  TwinRoom: {
    title: 'Twin Room (2 Adults)',
    maxGuestNumber: 2,
    description: 'TwinRoom',
  },
  QuadrupleRoom: {
    title: 'Quadruple Room (4 Adults)',
    maxGuestNumber: 4,
    description: 'QuadrupleRoom',
  },
};
