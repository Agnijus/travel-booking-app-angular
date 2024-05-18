import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  private searchData: SearchData | undefined;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
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
