import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from '../carousel/carousel.component';

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
  cities = ['Las Vegas', 'New York', 'Orlando', 'Miami', 'Los Angeles'];
  activeCity: string = 'Las Vegas';
  filteredCards: featuredHotel[] = [];

  constructor() {
    this.filterHotelsByLocation();
  }

  hotelCards = [
    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Las Vegas',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Las Vegas',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Las Vegas',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Las Vegas',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Las Vegas',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'New York',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'New York',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'New York',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'New York',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'New York',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'New York',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'New York',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Orlando',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Orlando',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Orlando',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Orlando',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Orlando',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Orlando',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Miami',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Miami',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Miami',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Miami',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Miami',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Miami',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Los Angeles',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Los Angeles',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Los Angeles',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Los Angeles',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Los Angeles',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Los Angeles',
    },
  ];

  setActiveCity(city: string): void {
    this.activeCity = city;
    this.filterHotelsByLocation();
  }

  filterHotelsByLocation(): void {
    this.filteredCards = this.hotelCards.filter(
      (hotel) => hotel.location === this.activeCity
    );
  }
}

export interface featuredHotel {
  name: string;
  image: string;
  distance: string;
  rating: string;
  location: string;
}
