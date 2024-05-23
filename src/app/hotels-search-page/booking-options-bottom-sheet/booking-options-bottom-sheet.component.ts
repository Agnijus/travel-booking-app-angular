import { Component, HostListener, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-options-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './booking-options-bottom-sheet.component.html',
  styleUrl: './booking-options-bottom-sheet.component.css',
})
export class BookingOptionsBottomSheetComponent {
  constructor(
    private bookingOptionsFilterBottomSheetRef: MatBottomSheetRef<BookingOptionsBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      isCancellationFree: boolean;
      isPayOnArrival: boolean;
    }
  ) {
    this.isCancellationFree = data.isCancellationFree;
    this.isPayOnArrival = data.isPayOnArrival;
  }

  isCancellationFree: boolean | undefined;
  isPayOnArrival: boolean | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.bookingOptionsFilterBottomSheetRef.dismiss();
  }

  updateBookingOptionFilters(): void {
    const bookingOptions = {
      isCancellationFree: this.isCancellationFree,
      isPayOnArrival: this.isPayOnArrival,
    };
    this.bookingOptionsFilterBottomSheetRef.dismiss(bookingOptions);
  }
}
