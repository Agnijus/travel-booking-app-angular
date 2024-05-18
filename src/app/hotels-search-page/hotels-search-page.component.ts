import { Component } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { SearchData } from '../search-data.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotels-search-page',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    CommonModule,
  ],
  templateUrl: './hotels-search-page.component.html',
  styleUrl: './hotels-search-page.component.css',
})
export class HotelsSearchPageComponent {
  searchParameters: SearchData | undefined;

  constructor(private searchDataService: SearchDataService) {}

  ngOnInit() {
    this.searchDataService.getSearchData().subscribe((data) => {
      this.searchParameters = data!;
    });
  }

  getSearchParameters() {
    console.log(this.searchParameters);
  }
}
