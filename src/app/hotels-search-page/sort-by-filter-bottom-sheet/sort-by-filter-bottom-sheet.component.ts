import { Component, HostListener } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-by-filter-bottom-sheet',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './sort-by-filter-bottom-sheet.component.html',
  styleUrl: './sort-by-filter-bottom-sheet.component.css',
})
export class SortByFilterBottomSheetComponent {
  constructor(
    private sortByFilterBottomSheetRef: MatBottomSheetRef<SortByFilterBottomSheetComponent>
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sortByFilterBottomSheetRef.dismiss();
  }

  selections: string[] = [
    'Price (Low-High)',
    'Price (High-Low)',
    'Closest to city center',
    'Stars (1-5)',
    'Stars (5-1)',
  ];

  selectFilter(filterOption: string) {
    this.sortByFilterBottomSheetRef.dismiss(filterOption);
  }
}
