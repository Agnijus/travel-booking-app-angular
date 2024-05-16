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
  brands = [
    {
      url: 'https://www.skyscanner.net/images/websites/h_bc.png',
      alt: 'Booking.com',
    },
    {
      url: 'https://www.skyscanner.net/images/websites/d_ct.png',
      alt: 'Trip.com',
    },
    {
      url: 'https://www.skyscanner.net/images/websites/h_hc.png',
      alt: 'Hotels.com',
    },
    {
      url: 'https://www.skyscanner.net/images/websites/220x80/h_hy.png',
      alt: 'Hyatt',
    },
    {
      url: 'https://www.skyscanner.com/images/websites/h_xp.png',
      alt: 'Expedia',
    },
    {
      url: 'https://www.skyscanner.net/images/websites/h_ic.png',
      alt: 'Intercontinental',
    },
  ];
}
