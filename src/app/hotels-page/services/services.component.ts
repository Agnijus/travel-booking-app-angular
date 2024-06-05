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
  baseUrl: string = 'https://localhost:5000/';
  services = [
    {
      path: 'Assets/services0.svg',
      title: 'Great hotel deals',
      description:
        'We search for deals with the world’s leading hotels, and share our findings with you.',
    },
    {
      path: 'Assets/services1.svg',
      title: 'Up-to-date pricing',
      description:
        'We always show you the most recent pricing overview we can find, so you know exactly what to expect.',
    },
    {
      path: 'Assets/services2.svg',
      title: 'Precise searching',
      description:
        'Find hotels with swimming pools, free cancellation, and flexible booking. Or whatever matters most to you.',
    },
  ];
}
