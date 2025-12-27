import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../models/app.interface';
import { GameCardComponent } from '../game-card/game-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-games',
  imports: [CommonModule, GameCardComponent],
  standalone: true,
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.css'
})
export class MyGamesComponent implements OnInit {
  @Input() games!: Game[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.games){
      const games: Game[] = [
        { id: 1, competition_id: 1, date: '2025-01-22T18:30:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 3, team1: { id: 101, name: 'Ace Masters', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, team2: { id: 102, name: 'Clay Warriors', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, status: 'completed', result: '6-4, 3-6, 7-6', updated_at: '', created_at: '' },
        { id: 2, competition_id: 2, date: '2025-01-25T19:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, team1: { id: 201, name: 'Padel Smash', sport_id: 2, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, team2: { id: 202, name: 'Golden Racket', sport_id: 2, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, status: 'scheduled', updated_at: '', created_at: '' },
        { id: 3, competition_id: 1, date: '2025-01-24T20:00:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 3, team1: { id: 103, name: 'Topspin United', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, team2: { id: 104, name: 'Baseline Kings', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, status: 'pending', updated_at: '', created_at: '' },
        { id: 4, competition_id: 2, date: '2025-01-27T21:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, team1: { id: 203, name: 'Red Net Padel', sport_id: 2, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, team2: { id: 204, name: 'Vibora Team', sport_id: 2, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, updated_at: '', created_at: '' },
        { id: 5, competition_id: 3, date: '2025-01-29T18:00:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 4, team1: { id: 105, name: 'Match Point', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, team2: { id: 106, name: 'Deuce Squad', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }, status: 'scheduled', updated_at: '', created_at: '' }
      ];
      this.games = games;
    }
  }

  onOpenCalendar() {
    this.router.navigate(['/games']);
  }
}
