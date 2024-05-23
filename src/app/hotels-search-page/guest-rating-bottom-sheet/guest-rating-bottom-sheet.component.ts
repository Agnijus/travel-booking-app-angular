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
  selector: 'app-guest-rating-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './guest-rating-bottom-sheet.component.html',
  styleUrl: './guest-rating-bottom-sheet.component.css',
})
export class GuestRatingBottomSheetComponent {
  constructor(
    private guestRatingBottomSheetRef: MatBottomSheetRef<GuestRatingBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      guestRatingRanges: GuestRatingRange[];
    }
  ) {
    this.guestRatingRanges = data.guestRatingRanges;
  }

  guestRatingRanges: GuestRatingRange[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.guestRatingBottomSheetRef.dismiss();
  }

  updateGuestRatingFilter(): void {
    this.guestRatingBottomSheetRef.dismiss(this.guestRatingRanges);
  }
}

interface GuestRatingRange {
  label: string;
  extra: string;
  min: number;
  checked: boolean;
}
