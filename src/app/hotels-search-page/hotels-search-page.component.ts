import { Component, HostListener, ViewChild } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { SearchData } from '../search-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { SortByFilterBottomSheetComponent } from './sort-by-filter-bottom-sheet/sort-by-filter-bottom-sheet.component';
import { PriceFilterBottomSheetComponent } from './price-filter-bottom-sheet/price-filter-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { GuestRatingBottomSheetComponent } from './guest-rating-bottom-sheet/guest-rating-bottom-sheet.component';
import { StarRatingBottomSheetComponent } from './star-rating-bottom-sheet/star-rating-bottom-sheet.component';
import { BookingOptionsBottomSheetComponent } from './booking-options-bottom-sheet/booking-options-bottom-sheet.component';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Room } from '../hotel-view-page/hotel-view-page.component';

@Component({
  selector: 'app-hotels-search-page',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './hotels-search-page.component.html',
  styleUrl: './hotels-search-page.component.css',
})
export class HotelsSearchPageComponent {
  constructor(
    private http: HttpService,
    private router: Router,
    private searchDataService: SearchDataService,
    private sortByFilterBottomSheet: MatBottomSheet,
    private priceFilterBottomSheet: MatBottomSheet,
    private guestRatingFilterBottomSheet: MatBottomSheet,
    private bookingOptionsFilterBottomSheet: MatBottomSheet
  ) {}

  baseUrl: string = 'https://localhost:5000/';
  hotels: Hotel[] = [];
  searchParameters: SearchData | undefined;

  ngOnInit() {
    this.http.fetchHotels().subscribe({
      next: (data: any) => {
        this.hotels = data;
        this.updateScreenSize();
        this.updateFilters();

        console.log(this.hotels);
        console.log(this.filteredHotels);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
    });
    console.log(this.hotels);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScreenSize();
  }

  // data filters

  priceRanges = [
    { label: '$0 - $100', min: 0, max: 100, checked: false },
    { label: '$100 - $200', min: 100, max: 200, checked: false },
    { label: '$200+', min: 200, max: Infinity, checked: false },
  ];

  ratingRanges = [
    { stars: 5, checked: false },
    { stars: 4, checked: false },
    { stars: 3, checked: false },
    { stars: 2, checked: false },
    { stars: 1, checked: false },
  ];

  guestRatingRanges = [
    { label: '5.0+', extra: 'With honours', min: 5.0, checked: false },
    { label: '4.5+', extra: 'Excellent', min: 4.5, checked: false },
    { label: '4.0+', extra: 'Very good', min: 4.0, checked: false },
    { label: '3.5+', extra: 'Good', min: 3.5, checked: false },
    { label: '3.0+', extra: 'Satisfactory', min: 3.0, checked: false },
  ];

  isCancellationFree: boolean = false;
  isPayOnArrival: boolean = false;

  infinity = Infinity;
  minPrice: number = 0;
  maxPrice: number = Infinity;

  activeStars: number[] = [];

  minGuestRating: number = 0;

  // priceLowToHigh: boolean = false;
  // priceHighToLow: boolean = false;
  // closestToCityCenter: boolean = false;
  // highestGuestRating: boolean = false;
  // starRatingLowToHigh: boolean = false;
  // starRatingHighToLow: boolean = false;

  isPriceFilterActive: boolean = false;
  isStarRatingFilterActive: boolean = false;
  isGuestRatingFilterActive: boolean = false;
  isLargeScreen: boolean = false;

  // filtered hotel data

  filteredHotels: Hotel[] = [];

  // filtering methods

  updateFilters(): void {
    this.updatePriceRange();
    this.updateStarRating();
    this.updateGuestRating();
    this.filterHotels();
  }

  filterHotels(): void {
    this.updateScreenSize();

    this.filteredHotels = this.hotels.filter((hotel) => {
      const isPriceInRange =
        hotel.rooms[0].pricePerNight >= this.minPrice &&
        hotel.rooms[0].pricePerNight <= this.maxPrice;
      const isRatingMatch =
        this.activeStars.length === 0 ||
        this.activeStars.includes(hotel.starRating);
      const matchesFreeCancellation =
        !this.isCancellationFree || hotel.hasFreeCancellation;
      const matchesPayOnArrival = !this.isPayOnArrival || hotel.hasPayOnArrival;

      const isGuestRatingInRange = hotel.guestRating >= this.minGuestRating;

      return (
        isPriceInRange &&
        isRatingMatch &&
        matchesFreeCancellation &&
        matchesPayOnArrival &&
        isGuestRatingInRange
      );
    });
  }

  updatePriceRange(): void {
    const activePriceRanges = this.priceRanges.filter((range) => range.checked);

    if (activePriceRanges.length > 0) {
      this.minPrice = Math.min(...activePriceRanges.map((range) => range.min));
      this.maxPrice = Math.max(...activePriceRanges.map((range) => range.max));
      this.isPriceFilterActive = true;
    } else {
      this.isPriceFilterActive = false;
      this.minPrice = 0;
      this.maxPrice = Infinity;
    }
  }

  updateStarRating(): void {
    const activeRatingRanges = this.ratingRanges.filter(
      (range) => range.checked
    );
    this.activeStars = activeRatingRanges
      .map((range) => range.stars)
      .sort((a, b) => a - b);
    this.isStarRatingFilterActive = activeRatingRanges.length > 0;
    this.filterHotels();
  }

  updateGuestRating(): void {
    const activeGuestRating = this.guestRatingRanges.filter(
      (range) => range.checked
    );
    if (activeGuestRating.length > 0) {
      this.minGuestRating = Math.min(
        ...activeGuestRating.map((range) => range.min)
      );
      this.isGuestRatingFilterActive = true;
    } else {
      this.minGuestRating = 0;
      this.isGuestRatingFilterActive = false;
    }
  }

  // mobile filters

  openSortByFilterBottomSheet(): void {
    const sortByFilterBottomSheetRef = this.sortByFilterBottomSheet.open(
      SortByFilterBottomSheetComponent
    );

    sortByFilterBottomSheetRef.afterDismissed().subscribe((selectedFilter) => {
      console.log(selectedFilter);
    });
  }

  openPriceFilterBottomSheet(): void {
    const priceFilterBottomSheetRef = this.priceFilterBottomSheet.open(
      PriceFilterBottomSheetComponent,
      {
        data: {
          min: this.minPrice,
          max: this.maxPrice,
        },
      }
    );
    priceFilterBottomSheetRef.afterDismissed().subscribe((priceRange) => {
      if (priceRange) {
        this.minPrice = priceRange.min;
        this.maxPrice = priceRange.max == 350 ? Infinity : priceRange.max;
        this.filterHotels();
        this.isPriceFilterActive =
          priceRange.min === 0 && priceRange.max == 350 ? false : true;
      }
    });
  }

  openGuestRatingFilterBottomSheet(): void {
    const guestRatingFilterBottomSheetRef =
      this.guestRatingFilterBottomSheet.open(GuestRatingBottomSheetComponent, {
        data: {
          guestRatingRanges: this.guestRatingRanges,
        },
      });
    guestRatingFilterBottomSheetRef
      .afterDismissed()
      .subscribe((guestRatingRanges) => {
        if (guestRatingRanges) {
          this.guestRatingRanges = guestRatingRanges;
          this.updateGuestRating();
          this.filterHotels();
        }
      });
  }

  openStarRatingFilterBottomSheet(): void {
    const guestRatingFilterBottomSheetRef =
      this.guestRatingFilterBottomSheet.open(StarRatingBottomSheetComponent, {
        data: {
          ratingRanges: this.ratingRanges,
        },
      });
    guestRatingFilterBottomSheetRef
      .afterDismissed()
      .subscribe((ratingRanges) => {
        if (ratingRanges) {
          this.ratingRanges = ratingRanges;
          this.updateStarRating();
          this.filterHotels();
        }
      });
  }

  openBookingOptionsFilterBottomSheet(): void {
    const bookingOptionsFilterBottomSheetRef =
      this.bookingOptionsFilterBottomSheet.open(
        BookingOptionsBottomSheetComponent,
        {
          data: {
            isCancellationFree: this.isCancellationFree,
            isPayOnArrival: this.isPayOnArrival,
          },
        }
      );
    bookingOptionsFilterBottomSheetRef
      .afterDismissed()
      .subscribe((bookingOptions) => {
        if (bookingOptions) {
          this.isCancellationFree = bookingOptions.isCancellationFree;
          this.isPayOnArrival = bookingOptions.isPayOnArrival;
          this.filterHotels();
        }
      });
  }

  // clear active filters

  clearFreeCancellationFilter(): void {
    this.isCancellationFree = false;
  }
  clearPayOnArrivalFilter(): void {
    this.isPayOnArrival = false;
  }

  clearPriceFilter(): void {
    this.minPrice = 0;
    this.maxPrice = Infinity;
    this.isPriceFilterActive = false;
    this.priceRanges.forEach((range) => (range.checked = false));
  }

  clearStarRatingFilter(): void {
    this.activeStars = [];
    this.isStarRatingFilterActive = false;
    this.ratingRanges.forEach((range) => (range.checked = false));
  }

  clearGuestRatingFilter(): void {
    this.minGuestRating = 0;
    this.isGuestRatingFilterActive = false;
    this.guestRatingRanges.forEach((range) => (range.checked = false));
  }

  clearAllFilters(): void {}

  // update screen size for filters

  updateScreenSize(): void {
    this.isLargeScreen = window.innerWidth >= 1000;
  }

  // navigate to hotel view

  viewHotelDetails(hotel: Hotel): void {
    this.router.navigate(['/hotels/view/', hotel.id]);
  }
}

// interfaces

export interface Hotel {
  id: number;
  name: string;
  images: string[];
  rooms: Room[];
  address: string;
  distance: number;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  pricePerNight: number;
  hasFreeCancellation: boolean;
  hasPayOnArrival: boolean;
}
