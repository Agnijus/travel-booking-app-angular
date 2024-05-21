import { Component, ViewChild } from '@angular/core';
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
    private priceFilterBottomSheet: MatBottomSheet
  ) {}

  searchParameters: SearchData | undefined;

  ngOnInit() {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
    });
    this.updateFilters();
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

  priceLowToHigh: boolean = false;
  priceHighToLow: boolean = false;
  closestToCityCenter: boolean = false;
  highestGuestRating: boolean = false;
  starRatingLowToHigh: boolean = false;
  starRatingHighToLow: boolean = false;

  isMobilePriceFilter: boolean = false;

  // raw hotel data

  hotels: Hotel[] = [
    {
      name: 'Las Vegas Hilton at Resorts World',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 5,
      guestRating: 3.1,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 288,
      pricePerNight: 450,
      hasFreeCancellation: false,
      hasPayOnArrival: true,
    },
    {
      name: 'Las Vegas Luxurious Place',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 5,
      guestRating: 4.6,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 3124,
      pricePerNight: 700,
      hasFreeCancellation: false,
      hasPayOnArrival: false,
    },
    {
      name: 'Las Vegas Hilton at Resorts World',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 3,
      guestRating: 3.1,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 288,
      pricePerNight: 100,
      hasFreeCancellation: true,
      hasPayOnArrival: false,
    },
    {
      name: 'Las Vegas Luxurious Place',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 4,
      guestRating: 3.9,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 3124,
      pricePerNight: 300,
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
    } else {
      this.minPrice = 0;
      this.maxPrice = Infinity;
    }
  }

  updateStarRating(): void {
    const activeRatingRanges = this.ratingRanges.filter(
      (range) => range.checked
    );
    this.activeStars = activeRatingRanges.map((range) => range.stars);
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
    } else {
      this.minGuestRating = 0;
    }
  }

  // mobile filter methods

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
        this.isMobilePriceFilter = true;
      }
    });
  }

  clearMobileFilters(): void {
    this.minPrice = 0;
    this.maxPrice = Infinity;
    this.isMobilePriceFilter = false;
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
