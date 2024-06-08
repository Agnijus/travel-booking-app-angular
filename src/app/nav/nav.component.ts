import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegionDialogComponent } from './region-dialog/region-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RegionDialogComponent,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  regionDialogRef!: MatDialogRef<RegionDialogComponent>;
  baseUrl: string = 'https://localhost:5000/';

  openRegionDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.regionDialogRef = this.dialog.open(RegionDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '0ms',
    });

    this.regionDialogRef.afterClosed().subscribe((result) => {});
  }
}
