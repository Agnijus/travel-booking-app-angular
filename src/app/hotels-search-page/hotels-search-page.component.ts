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
    private searchDataService: SearchDataService,
    private sortByFilterBottomSheet: MatBottomSheet,
    private priceFilterBottomSheet: MatBottomSheet,
    private guestRatingFilterBottomSheet: MatBottomSheet
  ) {}

  searchParameters: SearchData | undefined;

  ngOnInit() {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
    });
    this.updateScreenSize();
    this.updateFilters();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScreenSize();
  }

  // filter data

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

  // raw hotel data

  hotels: Hotel[] = [
    {
      name: 'Conrad Las Vegas at Resorts World',
      imageUrl:
        'https://content.skyscnr.com/available/1215563226/1215563226_320x252.jpg',
      distance: 0.8,
      rating: 5,
      guestRating: 3.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 731,
      pricePerNight: 173,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'Waldorf Astoria Las Vegas',
      imageUrl:
        'https://content.skyscnr.com/available/1394098245/1394098245_320x252.jpg',
      distance: 0.72,
      rating: 5,
      guestRating: 4.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 1086,
      pricePerNight: 304,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'The Orleans Hotel & Casino',
      imageUrl:
        'https://content.skyscnr.com/available/1167715507/1167715507_640x504.jpg',
      distance: 1.71,
      rating: 3,
      guestRating: 4.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 6816,
      pricePerNight: 83,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'Oasis at Gold Spike - Adults Only',
      imageUrl:
        'https://content.skyscnr.com/available/1394356996/1394356996_640x504.jpg',
      distance: 1.85,
      rating: 3,
      guestRating: 3.3,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 6,
      pricePerNight: 95,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'Hilton Vacation Club Cancum Resort Las Vegas',
      imageUrl:
        'https://content.skyscnr.com/available/756448108/756448108_640x504.jpg',
      distance: 1.24,
      rating: 3,
      guestRating: 3.5,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 1506,
      pricePerNight: 132,
      hasFreeCancellation: false,
      hasPayOnArrival: false,
    },
    {
      name: 'Thunderbird Boutique Hotel',
      imageUrl:
        'https://content.skyscnr.com/available/1280309776/1280309776_320x252.jpg',
      distance: 1.7,
      rating: 2,
      guestRating: 3.5,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 152,
      pricePerNight: 82,
      hasFreeCancellation: false,
      hasPayOnArrival: false,
    },
    {
      name: "Arizona Charlie's Decatur",
      imageUrl:
        'https://content.skyscnr.com/available/1363037707/1363037707_320x252.jpg',
      distance: 0.57,
      rating: 3,
      guestRating: 3.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 246,
      pricePerNight: 98,
      hasFreeCancellation: false,
      hasPayOnArrival: true,
    },
    {
      name: 'Hilton Lake Las Vegas Resort & Spa',
      imageUrl:
        'https://content.skyscnr.com/available/1136274483/1136274483_320x252.jpg',
      distance: 13.48,
      rating: 4,
      guestRating: 4.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 2047,
      pricePerNight: 169,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'Hampton Inn Tropicana',
      imageUrl:
        'https://content.skyscnr.com/available/1500727711/1500727711_320x252.jpg',
      distance: 0.83,
      rating: 2,
      guestRating: 4.5,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 3531,
      pricePerNight: 167,
      hasFreeCancellation: true,
      hasPayOnArrival: true,
    },
  ];

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
        hotel.pricePerNight >= this.minPrice &&
        hotel.pricePerNight <= this.maxPrice;
      const isRatingMatch =
        this.activeStars.length === 0 ||
        this.activeStars.includes(hotel.rating);
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
}

// interfaces

interface Hotel {
  name: string;
  imageUrl: string;
  distance: number;
  rating: number;
  guestRating: number;
  tripAdvisorReviewImage: string;
  reviews: number;
  pricePerNight: number;
  hasFreeCancellation: boolean;
  hasPayOnArrival: boolean;
}
