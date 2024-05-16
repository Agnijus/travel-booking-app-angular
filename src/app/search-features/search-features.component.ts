import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-features.component.html',
  styleUrl: './search-features.component.css',
})
export class SearchFeaturesComponent {
  features = [
    {
      id: 1,
      svgPath:
        'M10.5 4a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10.5a8.5 8.5 0 1115.176 5.262l4.531 4.53a1 1 0 01-1.414 1.415l-4.531-4.531A8.5 8.5 0 012 10.5z',
      text: 'Find the best-value hotel for your dates, search by price or preferences',
    },
    {
      id: 2,
      svgPath:
        'M21 6.908A3.908 3.908 0 0017.092 3H12.62a3 3 0 00-2.12.878l-6.623 6.624a2.997 2.997 0 000 4.238l5.382 5.382a2.997 2.997 0 004.238 0l6.624-6.624A2.996 2.996 0 0021 11.38V6.91zM16.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
      text: 'Compare hotel deals across hundreds of providers, all in one place',
    },
    {
      id: 3,
      svgPath:
        'M21.9 12.005h-.1a1 1 0 01-1-1l-.003-2.375h.003V6.394a1.305 1.305 0 00-.669-1.218l-1.947-.853a15.17 15.17 0 00-12.368 0l-1.947.853a1.306 1.306 0 00-.669 1.22v4.61a1 1 0 01-1 1h-.1A1.113 1.113 0 001 13.13v7.055a.82.82 0 001.626.136l.574-2.69h17.6l.575 2.69A.819.819 0 0023 20.184V13.13a1.113 1.113 0 00-1.1-1.125zm-15.9-2v-3a1 1 0 012 0v.84a5 5 0 017.157-.61 1 1 0 11-1.314 1.507 3 3 0 00-4.205.263H10 a1 1 0 010 2H7 a1 1 0 01-1-1zm12 4a1 1 0 11-2 0v-.175a5.001 5.001 0 01-7.434.925 1 1 0 011.324-1.5 3.001 3.001 0 004.814-1.25H14 a1 1 0 010-2h3 a1 1 0 011 1z',
      text: 'Look out for hotels with free cancellation or excellent ratings',
    },
  ];
}
