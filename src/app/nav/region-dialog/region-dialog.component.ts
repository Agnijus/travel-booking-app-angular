import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './region-dialog.component.html',
  styleUrl: './region-dialog.component.css',
})
export class RegionDialogComponent {
  languages = [{ value: 'en-uk', viewValue: 'English (United Kingdom)' }];
  regions = [{ value: 'us', viewValue: 'United States' }];
  currencies = [
    { value: 'usd', viewValue: 'USD - $' },
    { value: 'gbp', viewValue: 'GBP - £' },
  ];

  currentLanguage = { value: 'en-uk', viewValue: 'English (United Kingdom)' };
  currentRegion = { value: 'us', viewValue: 'United States' };
  currentCurrency = { value: 'usd', viewValue: 'USD - $' };

  constructor(public dialogRef: MatDialogRef<RegionDialogComponent>) {}

  updateCurrency(event: any): void {
    this.currentCurrency = { value: event.value, viewValue: event.viewValue };
  }

  save(): void {
    console.log(this.currentCurrency);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
