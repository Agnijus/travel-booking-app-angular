import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from '../carousel/carousel.component';
import { HttpService } from '../../http.service';
import { Hotel } from '../../hotels-search-page/hotels-search-page.component';

@Component({
  selector: 'app-featured-hotels',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, CarouselComponent],
  templateUrl: './featured-hotels.component.html',
  styleUrl: './featured-hotels.component.css',
})
export class FeaturedHotelsComponent {
  header: string = 'Hotels in your home country';
  paragraph: string =
    'Your next adventure may be closer than you think. Discover hotels just beyond your doorstep.';
  destinations = ['Las Vegas', 'New York', 'Orlando', 'Miami', 'Los Angeles'];
  activeDestination: string = 'Las Vegas';

  hotels!: Hotel[];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.fetchHotelsByDestination(this.activeDestination).subscribe({
      next: (data: any) => {
        this.hotels = data;
        console.log(this.hotels);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setActiveCity(city: string): void {
    this.activeDestination = city;

    this.http.fetchHotelsByDestination(this.activeDestination).subscribe({
      next: (data: any) => {
        this.hotels = data;
        console.log(this.hotels);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
