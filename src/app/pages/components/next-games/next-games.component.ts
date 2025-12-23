import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameCard } from '../../../models/app.interface';

@Component({
  selector: 'app-next-games',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './next-games.component.html',
  styleUrl: './next-games.component.css'
})
export class NextGamesComponent implements OnInit {
  @Input() games!: GameCard[];
  ngOnInit(): void {
    if (!this.games){
      const games: GameCard[] = [ { id: 1, competition_id: 1, date: '2025-01-22T18:30:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 3, team1: { id: 101, name: 'Ace Masters', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 102, name: 'Clay Warriors', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' } }, { id: 2, competition_id: 2, date: '2025-01-25T19:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, team1: { id: 201, name: 'Padel Smash', sport_id: 2, sport_name: 2, image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 202, name: 'Golden Racket', sport_id: 2, sport_name: 2, image: 'assets/images/team-default.png', gender: 'mixed' } }, { id: 3, competition_id: 1, date: '2025-01-24T20:00:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 3, team1: { id: 103, name: 'Topspin United', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 104, name: 'Baseline Kings', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' } }, { id: 4, competition_id: 2, date: '2025-01-27T21:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, team1: { id: 203, name: 'Red Net Padel', sport_id: 2, sport_name: 2, image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 204, name: 'Vibora Team', sport_id: 2, sport_name: 2, image: 'assets/images/team-default.png', gender: 'mixed' } }, { id: 5, competition_id: 3, date: '2025-01-29T18:00:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 4, team1: { id: 105, name: 'Match Point', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 106, name: 'Deuce Squad', sport_id: 1, sport_name: 1, image: 'assets/images/team-default.png', gender: 'mixed' } } ];
      this.games = games;
    }
  }

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
