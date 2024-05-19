import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  private searchData: SearchData = this.getDefaultSearchParameters();

  setSearchData(data: SearchData): void {
    this.searchData = data;
  }

  getSearchData(): Observable<SearchData> {
    return of(this.searchData);
  }

  private getDefaultSearchParameters(): SearchData {
    const today = new Date();
    return {
      destination: '',
      checkInDate: new Date(today.setDate(today.getDate() + 7)),
      checkOutDate: new Date(today.setDate(today.getDate() + 8)),
      adultsCount: 2,
      childrenCount: 0,
      roomsCount: 1,
      isCancellationFree: false,
      isFourStars: false,
      isThreeStars: false,
    };
  }
}
