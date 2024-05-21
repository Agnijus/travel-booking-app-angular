import { Component, HostListener, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-price-filter-bottom-sheet',
  standalone: true,
  imports: [MatSliderModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './price-filter-bottom-sheet.component.html',
  styleUrl: './price-filter-bottom-sheet.component.css',
})
export class PriceFilterBottomSheetComponent {
  constructor(
    private priceFilterBottomSheetRef: MatBottomSheetRef<PriceFilterBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      min: number;
      max: number;
    }
  ) {
    this.min = data.min;
    this.max = data.max > 350 ? 350 : data.max;
  }

  disabled = false;
  max = 350;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.priceFilterBottomSheetRef.dismiss();
  }

  updatePriceFilter(): void {
    const priceRange = { min: this.min, max: this.max, isActive: true };
    this.priceFilterBottomSheetRef.dismiss(priceRange);
  }
}
