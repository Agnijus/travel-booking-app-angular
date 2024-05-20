import { Component } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { SearchData } from '../search-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { SortByFilterBottomSheetComponent } from './sort-by-filter-bottom-sheet/sort-by-filter-bottom-sheet.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
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
  searchParameters: SearchData | undefined;

  priceRanges = [
    { label: '$0 - $100', min: 0, max: 100, checked: false },
    { label: '$100 - $200', min: 100, max: 200, checked: false },
    { label: '$200+', min: 200, max: Infinity, checked: false },
  ];

  ratingRanges = [
    { stars: 5, checked: false },
    { stars: 4, checked: false },
    { stars: 3, checked: false },
  ];

  minPrice: number = 0;
  maxPrice: number = Infinity;
  activeStars: number[] = [];
  isCancellationFree: boolean = false;
  isPayOnArrival: boolean = false;

  priceLowToHigh: boolean = false;
  priceHighToLow: boolean = false;
  closestToCityCenter: boolean = false;
  highestGuestRating: boolean = false;
  starRatingLowToHigh: boolean = false;
  starRatingHighToLow: boolean = false;

  hotels: Hotel[] = [
    {
      name: 'Las Vegas Hilton at Resorts World',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 5,
      tripAdvisorRating: 3.1,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 288,
      pricePerNight: 146,
      hasFreeCancellation: false,
      hasPayOnArrival: true,
    },
    {
      name: 'Las Vegas Luxurious Place',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 5,
      tripAdvisorRating: 4.6,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 3124,
      pricePerNight: 300,
      hasFreeCancellation: false,
      hasPayOnArrival: false,
    },
    {
      name: 'Las Vegas Hilton at Resorts World',
      imageUrl:
        'https://content.skyscnr.com/available/1464511300/1464511300_960x960.jpg',
      distance: 1.46,
      rating: 3,
      tripAdvisorRating: 3.1,
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
      rating: 5,
      tripAdvisorRating: 4.6,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 3124,
      pricePerNight: 800,
      hasFreeCancellation: true,
      hasPayOnArrival: true,
    },
  ];

  filteredHotels: Hotel[] = [];

  constructor(
    private searchDataService: SearchDataService,
    private sortByFilterBottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.searchDataService.getSearchData().subscribe((data: any) => {
      this.searchParameters = data!;
    });
    this.updateFilters();
  }

  getSearchParameters() {
    console.log(this.searchParameters);
  }

  updateFilters(): void {
    this.updatePriceRange();
    this.updateStarRating();
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

      return (
        isPriceInRange &&
        isRatingMatch &&
        matchesFreeCancellation &&
        matchesPayOnArrival
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

  openSortByFilterBottomSheet(): void {
    const sortByFilterBottomSheetRef = this.sortByFilterBottomSheet.open(
      SortByFilterBottomSheetComponent
    );

    sortByFilterBottomSheetRef.afterDismissed().subscribe((selectedFilter) => {
      console.log(selectedFilter);
    });
  }
}

interface Hotel {
  name: string;
  imageUrl: string;
  distance: number;
  rating: number;
  tripAdvisorRating: number;
  tripAdvisorReviewImage: string;
  reviews: number;
  pricePerNight: number;
  hasFreeCancellation: boolean;
  hasPayOnArrival: boolean;
}
