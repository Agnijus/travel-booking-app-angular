import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services = [
    {
      imageUrl:
        'https://content.skyscnr.com/m/35d2dfcc0cf14520/original/Hotels-Deals.svg',
      title: 'Great hotel deals',
      description:
        "Enter your location and see what's available. From family-friendly SUVs to luxury convertibles, you’ll get a great price on every type of hire car.",
    },
    {
      imageUrl:
        'https://content.skyscnr.com/m/657ded434cfa22e6/original/Illustration_hotel_bell.svg',
      title: 'Up-to-date pricing',
      description:
        'Compare rental cars on fuel policy, mileage, provider rating, flexible booking, cleanliness, customer service and more.',
    },
    {
      imageUrl:
        'https://content.skyscnr.com/m/10eb5a37b8ce7d8b/original/Illustration_hotel_compare_scales.svg',
      title: 'Precise searching',
      description:
        "We compare car rental prices on 100s of sites for you, so once you've found your ride, you'll be redirected to book with the provider, with no extra fees.",
    },
  ];
}
