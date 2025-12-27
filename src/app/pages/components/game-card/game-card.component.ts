import { Component, Input, inject } from '@angular/core';
import { Game } from '../../../models/app.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {

  @Input() game: Game | null = null;

  private router = inject(Router);

  getGameImage(sport: string): string {
    switch (sport) {
      case 'tennis':
        return 'assets/images/sports/tennis/tennis-field-1.jpeg';
      case 'padel':
        return 'assets/images/sports/padel/padel-field-1.jpeg';
      default:
        return 'assets/images/default-field.jpg';
    }
  }

  onOpenGame() {
    if (!this.game) return;
    this.router.navigate(['/game'], { state: { game: this.game } });
  }
}
