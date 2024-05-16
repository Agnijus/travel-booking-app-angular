import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guests-rooms-dialog',
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
  templateUrl: './guests-rooms-dialog.component.html',
  styleUrl: './guests-rooms-dialog.component.css',
})
export class GuestsRoomsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GuestsRoomsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      adultsCount: number;
      childrenCount: number;
      roomsCount: number;
    }
  ) {}

  decreaseAdultsCount(): void {
    this.data.adultsCount--;

    if (this.data.roomsCount > this.data.adultsCount) {
      this.data.roomsCount--;
    }
  }

  increaseAdultsCount(): void {
    this.data.adultsCount++;
  }

  decreaseChildrenCount(): void {
    this.data.childrenCount--;
  }

  increaseChildrenCount(): void {
    this.data.childrenCount++;
  }

  decreaseRoomsCount(): void {
    this.data.roomsCount--;
  }

  increaseRoomsCount(): void {
    this.data.roomsCount++;

    if (this.data.roomsCount > this.data.adultsCount) {
      this.data.adultsCount++;
    }
  }
  closeDialog(): void {
    this.dialogRef.close(this.data);
  }
}
