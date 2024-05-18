import { Component } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { SearchData } from '../search-data.service';

@Component({
  selector: 'app-hotels-search-page',
  standalone: true,
  imports: [],
  templateUrl: './hotels-search-page.component.html',
  styleUrl: './hotels-search-page.component.css',
})
export class HotelsSearchPageComponent {
  searchData: SearchData | undefined;

  constructor(private searchDataService: SearchDataService) {}

  ngOnInit() {
    this.searchData = this.searchDataService.getSearchData();
  }

  getSearchParameters() {
    console.log(this.searchData);
  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     this.searchParameters = {
  //       destination: params['destination'],
  //       checkInDate: params['checkInDate'],
  //       checkOutDate: params['checkOutDate'],
  //       adultsCount: params['adultsCount'],
  //       childrenCount: params['childrenCount'],
  //       roomsCount: params['roomsCount'],
  //       isCancellationFree: params['isCancellationFree'],
  //       isFourStars: params['isFourStars'],
  //       isThreeStars: params['isThreeStars'],
  //     };
  //     this.fetchHotels();
  //   });
  // }
}
