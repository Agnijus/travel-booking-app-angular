import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  header: string = 'Compare hotels across your favourite brands';
  baseUrl: string = 'https://localhost:5000/';
  brands = [
    {
      path: 'Assets/brand0.png',
      alt: 'Booking.com',
    },
    {
      path: 'Assets/brand1.png',
      alt: 'Trip.com',
    },
    {
      path: 'Assets/brand2.png',
      alt: 'Hotels.com',
    },
    {
      path: 'Assets/brand3.png',
      alt: 'Hyatt',
    },
    {
      path: 'Assets/brand4.png',
      alt: 'Expedia',
    },
    {
      path: 'Assets/brand5.png',
      alt: 'Intercontinental',
    },
  ];
}
