import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentHotelService } from '../current-hotel.service';
import { SearchDataService } from '../search-data.service';
import { Hotel } from '../hotels-search-page/hotels-search-page.component';
import { CommonModule } from '@angular/common';
import { SearchData } from '../search-data.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
  hotel: Hotel = {
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
    guestRating: 3.0,
    tripAdvisorReviewImage:
      'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
    reviews: 731,
    pricePerNight: 173,
    hasFreeCancellation: true,
    hasPayOnArrival: false,
  };

  searchParameters: SearchData | undefined;
  totalDaysStay: number | undefined;
  dataSource: AvailabilityData[] = [];
  displayedColumns: string[] = ['display', 'guestNumber', 'totalPrice'];
  public openDatePicker = false;

  constructor(
    private currentHotelService: CurrentHotelService,
    private searchDataService: SearchDataService
  ) {}

  ngOnInit(): void {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
      this.calculateTotalDays();
      this.updatePricing();
    });

    // this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
    //   this.hotel = data;
    // });
    // console.log(this.hotel);
  }

  calculateTotalDays(): void {
    if (
      this.searchParameters?.checkInDate &&
      this.searchParameters?.checkOutDate
    ) {
      const checkInDate = new Date(this.searchParameters.checkInDate);
      const checkOutDate = new Date(this.searchParameters.checkOutDate);

      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      this.totalDaysStay = Math.ceil(daysDifference);
    } else {
      this.totalDaysStay = 0;
    }
  }

  updatePricing(): void {
    this.dataSource = [
      {
        display: 'Double Room',
        guestNumber: 1,
        totalPrice: this.hotel.pricePerNight * (this.totalDaysStay || 0) * 1.05,
      },
      {
        display: 'Double Room',
        guestNumber: 2,
        totalPrice: this.hotel.pricePerNight * (this.totalDaysStay || 0),
      },
      {
        display: 'Twin Room',
        guestNumber: 2,
        totalPrice: this.hotel.pricePerNight * (this.totalDaysStay || 0) * 1.05,
      },
      {
        display: 'Quadruple Room',
        guestNumber: 4,
        totalPrice: this.hotel.pricePerNight * (this.totalDaysStay || 0) * 1.3,
      },
    ];
  }

  // change dates method

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
}

export interface AvailabilityData {
  display: string;
  guestNumber: number;
  totalPrice: number;
}
