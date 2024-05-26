import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentHotelService } from '../current-hotel.service';
import { Hotel } from '../hotels-search-page/hotels-search-page.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-view-page',
  standalone: true,
  imports: [SearchBarComponent, MatTableModule, CommonModule],
  templateUrl: './hotel-view-page.component.html',
  styleUrl: './hotel-view-page.component.css',
})
export class HotelViewPageComponent {
  constructor(private currentHotelService: CurrentHotelService) {}

  hotel: any = {
    id: 1,
    name: 'Conrad Las Vegas at Resorts World',
    imageUrl: [
      'https://content.skyscnr.com/available/1395012434/1395012434_WxH.jpg',
      'https://content.skyscnr.com/available/1303344146/1303344146_WxH.jpg',
      'https://content.skyscnr.com/available/1215563226/1215563226_320x252.jpg',
    ],
    address:
      '111 Resorts World Avenue, Downtown Las Vegas, Las Vegas, 89109, United States',
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

  // ngOnInit(): void {
  //   this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
  //     this.hotel = data;
  //   });
  //   console.log(this.hotel);
  // }
}
