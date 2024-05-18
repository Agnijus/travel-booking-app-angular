import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getDefaultSearchParameters } from './hotels-page/search-bar/search-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  private searchData: SearchData | undefined;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData(): Observable<SearchData> {
    const data = localStorage.getItem('searchData');
    return of(
      data ? (JSON.parse(data) as SearchData) : getDefaultSearchParameters()
    );
  }
}

export interface SearchData {
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  adultsCount: number;
  childrenCount: number;
  roomsCount: number;
  isCancellationFree: boolean;
  isFourStars: boolean;
  isThreeStars: boolean;
}
