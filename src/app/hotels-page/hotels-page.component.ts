import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { SearchFeaturesComponent } from './search-features/search-features.component';
import { Hero2Component } from './hero2/hero2.component';
import { BrandsComponent } from './brands/brands.component';
import { FeaturedHotelsComponent } from './featured-hotels/featured-hotels.component';
import { FactsComponent } from './facts/facts.component';
import { ServicesComponent } from '../services/services.component';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    HeroComponent,
    SearchFeaturesComponent,
    Hero2Component,
    BrandsComponent,
    FeaturedHotelsComponent,
    FactsComponent,
    ServicesComponent,
    FaqComponent,
  ],
  templateUrl: './hotels-page.component.html',
  styleUrl: './hotels-page.component.css',
})
export class HotelsPageComponent {}
