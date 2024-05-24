import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentHotelService } from '../current-hotel.service';
import { Hotel } from '../hotels-search-page/hotels-search-page.component';

@Component({
  selector: 'app-hotel-view-page',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './hotel-view-page.component.html',
  styleUrl: './hotel-view-page.component.css',
})
export class HotelViewPageComponent implements OnInit {
  constructor(private currentHotelService: CurrentHotelService) {}

  hotel!: Hotel;

  ngOnInit(): void {
    this.currentHotelService.getCurrentHotel().subscribe((data: any) => {
      this.hotel = data;
    });
    console.log(this.hotel);
  }
}
