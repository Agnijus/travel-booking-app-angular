import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentHotelService } from '../current-hotel.service';
import { Hotel } from '../hotels-search-page/hotels-search-page.component';
import { MatTableModule } from '@angular/material/table';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-hotel-view-page',
  standalone: true,
  imports: [SearchBarComponent, MatTableModule],
  templateUrl: './hotel-view-page.component.html',
  styleUrl: './hotel-view-page.component.css',
})
export class HotelViewPageComponent {
  constructor(private currentHotelService: CurrentHotelService) {}

  hotel: Hotel = {
    id: 1,
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
  };

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  // ngOnInit(): void {
  //   this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
  //     this.hotel = data;
  //   });
  //   console.log(this.hotel);
  // }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
