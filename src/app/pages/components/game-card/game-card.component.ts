import { Component, Input } from '@angular/core';
import { GameCard } from '../../../models/app.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {

  @Input() game: GameCard | null = null;

  getGameImage(sport: string): string {
    switch (sport) {
      case 'tennis':
        return 'assets/images/sports/tennis/tennis-field-1.jpeg';
      case 'padel':
        return 'assets/images/sports/padel/padel-field-1.jpeg';
      default:
        return 'assets/images/default-field.jpeg';
    }
  }
}
