import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.css',
})
export class FactsComponent {
  facts = [
    {
      svgPath:
        'M19 6h-4a4 4 0 00-4-4H7a4 4 0 00-4 4v15a1 1 0 002 0V6a2 2 0 012-2h4a2 2 0 012 2 2.15 2.15 0 00-2 2v13a1 1 0 001 1h1a1 1 0 001-1v-1.5a .5 .5 0 01.5-.5h3a .5 .5 0 01.5 .5V21 a1 1 0 001 1h1 a1 1 0 001-1V8 a2.15 2.15 0 00-2-2zm-5 11 a1 1 0 111-1 a1 1 0 01-1 1zm0-3 a1 1 0 111-1 a1 1 0 01-1 1zm0-3 a1 1 0 111-1 a1 1 0 01-1 1zm4 6 a1 1 0 111-1 a1 1 0 01-1 1zm0-3 a1 1 0 111-1 a1 1 0 01-1 1zm0-3 a1 1 0 111-1 a1 1 0 01-1 1zM9 7 a1 1 0 11-1-1 a1 1 0 011 1zm0 3 a1 1 0 11-1-1 a1 1 0 011 1zm0 6 a1 1 0 11-1-1 a1 1 0 011 1zm0-3 a1 1 0 11-1-1 a1 1 0 011 1zm0 6 a1 1 0 11-1-1 a1 1 0 011 1',
      text: 'Find the best-value hotel for your dates, search by price or preferences',
      number: '60+',
    },
    {
      svgPath:
        'M12 2.158a8 8 0 00-8 8v.06a5.522 5.522 0 00.027.605 7.955 7.955 0 001.357 3.833 30.756 30.756 0 005.972 6.94 .965.965 0 001.288 0 30.731 30.731 0 005.972-6.94 7.955 7.955 0 001.357-3.833 5.51 5.51 0 00.027-.604v-.061a8 8 0 00-8-8zm0 11 a3 3 0 113-3 a3 3 0 01-3 3',
      text: 'Compare hotel deals across hundreds of providers, all in one place',
      number: '5000+',
    },
    {
      svgPath:
        'M4.608 5.93A1.153 1.153 0 004 7.013V10a1 1 0 001 1h1a1 1 0 001-1V9a1 1 0 011-1h2a1 1 0 011 1v1.2a.8.8 0 00.8.8h.4a.8.8 0 00.8-.8V9 a1 1 0 011-1h2 a1 1 0 011 1v1 a1 1 0 001 1h.999 a1 1 0 001-1l-.002-1H20V7.013a1.154 1.154 0 00-.608-1.083l-1.77-.758a14.067 14.067 0 00-11.244 0zM3 12 a1 1 0 00-1 1v6a1 1 0 001 1h.28a1 1 0 00.948-.684L5 17h14l.772 2.316a1 1 0 00.949.684H21a1 1 0 001-1v-6a1 1 0 00-1-1',
      text: 'Look out for hotels with free cancellation or excellent ratings',
      number: '3.2million',
    },
  ];
}
