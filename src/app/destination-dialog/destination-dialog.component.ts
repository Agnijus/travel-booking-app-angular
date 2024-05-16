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
import { constructQueryParams } from '../hotels-query-helper';

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

  popularDestinations = [
    { name: 'Las Vegas', location: 'Clark County, Nevada, United States' },
    { name: 'New York', location: 'United States' },
    { name: 'London', location: 'England, United Kingdom' },
    { name: 'Tokyo', location: 'Japan' },
    { name: 'Miami', location: 'Miami-Dade, Florida, United States' },
    { name: 'Cancun', location: 'Quintana Roo, Mexico' },
    { name: 'Los Angeles', location: 'California, United States' },
    { name: 'Orlando', location: 'Orange County, Florida, United States' },
    { name: 'Chicago', location: 'Cook County, Illinois, United States' },
    { name: 'Paris', location: 'Île-de-France, France' },
  ];

  checkInDayMonthFormat: string | undefined;
  checkOutDayMonthFormat: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<DestinationDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    const queryParams = constructQueryParams(this.previousSearch);
    this.router.navigate(['/hotels/search'], { queryParams });
  }

  closeDialog(): void {
    this.dialogRef.close(this.destination);
  }
}
