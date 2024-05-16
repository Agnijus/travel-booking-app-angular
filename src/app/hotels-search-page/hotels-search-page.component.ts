import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-hotels-search-page',
  standalone: true,
  imports: [],
  templateUrl: './hotels-search-page.component.html',
  styleUrl: './hotels-search-page.component.css',
})
export class HotelsSearchPageComponent {
  searchParameters: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchParameters = {
        destination: params['destination'],
        checkInDate: params['checkInDate'],
        checkOutDate: params['checkOutDate'],
        adultsCount: params['adultsCount'],
        childrenCount: params['childrenCount'],
        roomsCount: params['roomsCount'],
        isCancellationFree: params['isCancellationFree'],
        isFourStars: params['isFourStars'],
        isThreeStars: params['isThreeStars'],
      };
      this.fetchHotels();
    });
  }

  fetchHotels(): void {
    this.httpService.fetchHotels(this.searchParameters).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error.url);
      },
    });
  }
}
