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
  cities = ['Edinburgh', 'Manchester', 'London', 'Belfast', 'Glasgow'];
  activeCity: string = 'Edinburgh';
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
      location: 'Edinburgh',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Edinburgh',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Edinburgh',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Edinburgh',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Edinburgh',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Manchester',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Manchester',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Manchester',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Manchester',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Manchester',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Manchester',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Manchester',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'London',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'London',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'London',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'London',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'London',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'London',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Belfast',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Belfast',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Belfast',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Belfast',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Belfast',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Belfast',
    },

    {
      name: 'Hotel One',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '2 miles',
      rating: '★★★★☆',
      location: 'Glasgow',
    },
    {
      name: 'Hotel Two',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '5 miles',
      rating: '★★★☆☆',
      location: 'Glasgow',
    },
    {
      name: 'Hotel Three',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '3 miles',
      rating: '★★★★★',
      location: 'Glasgow',
    },
    {
      name: 'Hotel Four',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '1 mile',
      rating: '★★☆☆☆',
      location: 'Glasgow',
    },
    {
      name: 'Hotel Five',
      image:
        'https://content.skyscnr.com/available/1269193484/1269193484_392x116.jpg',
      distance: '4 miles',
      rating: '★★★☆☆',
      location: 'Glasgow',
    },
    {
      name: 'Hotel Six',
      image:
        'https://content.skyscnr.com/available/1364824169/1364824169_392x116.jpg',
      distance: '6 miles',
      rating: '★★★★☆',
      location: 'Glasgow',
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
