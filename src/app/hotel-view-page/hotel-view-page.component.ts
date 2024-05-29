import { Component, KeyValueDiffers } from '@angular/core';
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
  public searchParameters: SearchData | undefined;
  private differ: any;

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

  totalDaysStay: number = 0;
  dataSource: AvailabilityData[] = [];
  displayedColumns: string[] = ['display', 'guestNumber', 'totalPrice'];
  public openDatePicker = false;

  constructor(
    private currentHotelService: CurrentHotelService,
    private searchDataService: SearchDataService,
    private differs: KeyValueDiffers
  ) {
    this.differ = this.differs.find({}).create();
  }

  // get search params from service, calculate total days

  ngOnInit(): void {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
      this.updatePricing();
      this.totalDaysStay = this.calculateTotalDays();

      console.log(this.searchParameters);
    });

    // this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
    //   this.hotel = data;
    // });
    // console.log(this.hotel);
  }

  ngDoCheck(): void {
    if (this.searchParameters) {
      const changes = this.differ.diff(this.searchParameters);
      if (changes) {
        changes.forEachChangedItem((record: any) => {
          if (record.key === 'checkInDate' || record.key === 'checkOutDate') {
            this.totalDaysStay = this.calculateTotalDays();
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

  updatePricing(): void {
    this.dataSource = [
      {
        display: 'Double Room',
        guestNumber: 1,
        totalPrice: this.hotel.pricePerNight * this.totalDaysStay * 1.05,
      },
      {
        display: 'Double Room',
        guestNumber: 2,
        totalPrice: this.hotel.pricePerNight * this.totalDaysStay,
      },
      {
        display: 'Twin Room',
        guestNumber: 2,
        totalPrice: this.hotel.pricePerNight * this.totalDaysStay * 1.05,
      },
      {
        display: 'Quadruple Room',
        guestNumber: 4,
        totalPrice: this.hotel.pricePerNight * this.totalDaysStay * 1.3,
      },
    ];
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
}

export interface AvailabilityData {
  display: string;
  guestNumber: number;
  totalPrice: number;
}
