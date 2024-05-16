import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatDividerModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() cards: any[] = [];
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }
}
