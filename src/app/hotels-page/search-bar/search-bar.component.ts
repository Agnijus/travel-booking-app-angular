import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GuestsRoomsDialogComponent } from '../../guests-rooms-dialog/guests-rooms-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DestinationDialogComponent } from '../../destination-dialog/destination-dialog.component';
import { Router } from '@angular/router';
import { SearchDataService } from '../../search-data.service';
import { SearchData } from '../../search-data.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @ViewChild('guestsRoomsInput') guestsRoomsInput!: ElementRef;
  @ViewChild('destinationInput') destinationInput!: ElementRef;
  @Input() data?: SearchData;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private searchDataService: SearchDataService
  ) {}

  guestsRoomsDialogRef!: MatDialogRef<GuestsRoomsDialogComponent>;
  destinationDialogRef!: MatDialogRef<DestinationDialogComponent>;

  searchParameters!: SearchData;
  todayDate: Date = new Date();
  calendarTouchUi: boolean = true;

  ngOnInit(): void {
    this.searchDataService.getSearchData().subscribe({
      next: (data) => {
        this.searchParameters = data;
      },
      error: (error) => console.error('Unable to load parameters', error),
    });
    this.updateCalendarTouchUi();
  }

  // update calendar & dialog positions on resize

  @HostListener('window:resize')
  onResize() {
    this.updateCalendarTouchUi();
    if (this.guestsRoomsDialogRef) {
      this.updateGuestsRoomsDialogPosition();
    }
    if (this.destinationDialogRef) {
      this.updateDestinationDialogPosition();
    }
  }

  // open & update dialog methods

  openGuestsRoomsDialog(event: MouseEvent): void {
    event.stopPropagation();
    const rect = this.guestsRoomsInput.nativeElement.getBoundingClientRect();
    this.guestsRoomsDialogRef = this.dialog.open(GuestsRoomsDialogComponent, {
      backdropClass: 'no-backdrop',
      width: '250px',
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position: { top: `${rect.bottom + 20}px`, left: `${rect.left - 20}px` },
      data: {
        adultsCount: this.searchParameters.adultsCount,
        childrenCount: this.searchParameters.childrenCount,
        roomsCount: this.searchParameters.roomsCount,
      },
    });

    this.updateGuestsRoomsDialogPosition();

    this.guestsRoomsDialogRef.backdropClick().subscribe(() => {
      this.guestsRoomsDialogRef.close(
        this.guestsRoomsDialogRef.componentInstance.data
      );
    });

    this.guestsRoomsDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.searchParameters.adultsCount = result.adultsCount;
        this.searchParameters.childrenCount = result.childrenCount;
        this.searchParameters.roomsCount = result.roomsCount;
      }
    });
  }

  updateGuestsRoomsDialogPosition(): void {
    const rect = this.guestsRoomsInput.nativeElement.getBoundingClientRect();
    this.guestsRoomsDialogRef.updatePosition({
      top: `${rect.bottom + 13}px`,
      left: `${rect.left - 15}px`,
    });
  }

  openDestinationDialog(event: MouseEvent): void {
    event.stopPropagation();
    const rect = this.destinationInput.nativeElement.getBoundingClientRect();
    this.destinationDialogRef = this.dialog.open(DestinationDialogComponent, {
      backdropClass: 'no-backdrop',
      width: '500px',
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position: { top: `${rect.bottom + 20}px`, left: `${rect.left - 20}px` },
    });

    this.updateDestinationDialogPosition();

    this.destinationDialogRef.backdropClick().subscribe(() => {
      this.destinationDialogRef.close();
    });

    this.destinationDialogRef.afterClosed().subscribe((destination) => {
      if (destination) {
        this.searchParameters.destination = destination;
      }
    });
  }

  updateDestinationDialogPosition(): void {
    const rect = this.destinationInput.nativeElement.getBoundingClientRect();
    this.destinationDialogRef.updatePosition({
      top: `${rect.bottom + 6}px`,
      left: `${rect.left - 15}px`,
    });
  }

  updateCalendarTouchUi(): void {
    this.calendarTouchUi = window.innerWidth <= 600;
  }

  searchHotels(): void {
    localStorage.setItem(
      'previousSearch',
      JSON.stringify(this.searchParameters)
    );

    this.searchDataService.setSearchData(this.searchParameters);
    const destination = this.searchParameters.destination;
    this.router.navigate([`/hotels/search/${destination}`]);
  }
}
