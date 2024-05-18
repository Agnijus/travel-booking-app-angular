import { Component } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { SearchData } from '../search-data.service';
import { SearchBarComponent } from '../hotels-page/search-bar/search-bar.component';
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
  ],
  templateUrl: './hotels-search-page.component.html',
  styleUrl: './hotels-search-page.component.css',
})
export class HotelsSearchPageComponent {
  searchParameters: SearchData | undefined;

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
      rating: 3,
      tripAdvisorRating: 3.0,
      tripAdvisorReviewImage:
        'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.0-64600-4.png',
      reviews: 288,
      pricePerNight: 146,
      hasFreeCancellation: true,
    },
  ];

  constructor(
    private searchDataService: SearchDataService,
    private sortByFilterBottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.searchDataService.getSearchData().subscribe((data) => {
      this.searchParameters = data!;
    });
  }

  getSearchParameters() {
    console.log(this.searchParameters);
  }

  openSortByFilterBottomSheet(): void {
    const sortByFilterBottomSheetRef = this.sortByFilterBottomSheet.open(
      SortByFilterBottomSheetComponent
    );

    sortByFilterBottomSheetRef.afterDismissed().subscribe((selectedFilter) => {
      console.log('Selected Filter:', selectedFilter);
      // Handle the filter application logic here
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
}
