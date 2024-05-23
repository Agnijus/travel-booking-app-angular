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
  selector: 'app-star-rating-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './star-rating-bottom-sheet.component.html',
  styleUrl: './star-rating-bottom-sheet.component.css',
})
export class StarRatingBottomSheetComponent {
  constructor(
    private starRatingBottomSheetRef: MatBottomSheetRef<StarRatingBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      ratingRanges: RatingRanges[];
    }
  ) {
    this.ratingRanges = data.ratingRanges;
  }

  ratingRanges: RatingRanges[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.starRatingBottomSheetRef.dismiss();
  }

  updateStarRatingFilter(): void {
    this.starRatingBottomSheetRef.dismiss(this.ratingRanges);
  }
}

interface RatingRanges {
  stars: number;
  checked: boolean;
}
