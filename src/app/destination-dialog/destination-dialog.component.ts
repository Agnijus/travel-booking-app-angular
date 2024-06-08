import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { SearchDataService } from '../search-data.service';

@Component({
  selector: 'app-destination-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDividerModule,
    MatSelectModule,
  ],
  templateUrl: './destination-dialog.component.html',
  styleUrl: './destination-dialog.component.css',
})
export class DestinationDialogComponent {
  destination: string | undefined;
  previousSearch: any;

  popularDestinations!: PopularDestination[];

  checkInDayMonthFormat: string | undefined;
  checkOutDayMonthFormat: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DestinationDialogComponent>,
    private http: HttpService,
    private router: Router,
    private searchDataService: SearchDataService
  ) {}

  ngOnInit(): void {
    this.http.fetchPopularDestinations().subscribe({
      next: (data: any) => {
        this.popularDestinations = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    try {
      const storedData = localStorage.getItem('previousSearch');
      if (storedData) {
        this.previousSearch = JSON.parse(storedData);
        this.previousSearch.checkInDate = new Date(
          this.previousSearch.checkInDate
        );
        this.previousSearch.checkOutDate = new Date(
          this.previousSearch.checkOutDate
        );
      } else {
        console.error('No recent destinations.');
      }
    } catch (error) {
      console.error('Failed to read from cache');
    }
  }

  selectDestination(destination: string): void {
    this.destination = destination;
    this.closeDialog();
  }

  selectRecentDestination(): void {
    this.searchDataService.setSearchData(this.previousSearch);
    this.router.navigate(['/hotels/search']);
  }

  closeDialog(): void {
    this.dialogRef.close(this.destination);
  }
}

interface PopularDestination {
  name: string;
  location: string;
}
