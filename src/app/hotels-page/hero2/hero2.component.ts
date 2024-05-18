import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero2',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './hero2.component.html',
  styleUrl: './hero2.component.css',
})
export class Hero2Component {
  title: string = 'Save on your next hotel booking';
  subtitle: string =
    'We’ve pulled together some top hotel deals, so you can find an amazing room at an even better price.';
  buttonText: string = 'See hotel deals';
}
