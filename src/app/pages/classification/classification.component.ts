import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Competition } from '../../models/app.interface';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, RouterModule, BackButtonComponent],
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent {
  competitionId!: number;

  hasLoses: boolean = true;

  // Dummy data for now. Replace with real service call.
  rows: Array<{ position: number; team: string; played: number; won: number; draw: number; lost: number; points: number }> = [];

  // Read-only competition details (simulated)
  competition?: Competition;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.competitionId = idParam ? Number(idParam) : 0;
    // TODO: fetch classification by competitionId
    this.rows = [
      { position: 1, team: 'Equipo A', played: 10, won: 8, draw: 1, lost: 1, points: 25 },
      { position: 2, team: 'Equipo B', played: 10, won: 7, draw: 2, lost: 1, points: 23 },
      { position: 3, team: 'Equipo C', played: 10, won: 5, draw: 3, lost: 2, points: 18 },
    ];

    // TODO: fetch competition details by competitionId
    this.competition = {
      id: this.competitionId,
      sport_id: 2,
      name: 'Liga Municipal Invierno',
      type: 1, // Liga
      level: 2, // Intermedio
      min_teams: 6,
      max_teams: 12,
      min_players_per_team: 5,
      max_players_per_team: 12,
      start_date: '2025-01-15',
      end_date: '2025-03-30',
      // registration_open_at: null,
      // registration_close_at: null,
      location: 1,
      timezone: 'Europe/Madrid',
      organizer_name: 'Ayuntamiento',
      organizer_email: 'deportes@ciudad.es',
      organizer_phone: '+34 600 000 000',
      is_open: true,
      status: 'iniciada',
      back_to_back: true,
      allow_draws: true,
      points_win: 3,
      points_draw: 1,
      points_loss: 0,
      fee_amount: null,
      fee_currency: null,
      description: 'Liga local de tenis nivel intermedio.',
      rules_url: 'https://example.com/reglas',
      prizes: 'Trofeos y material deportivo',
      banner_url: null,
      is_public: true,
    };
  }

  // Calculates win percentage similar to the design (rounded to whole number)
  getWinPct(r: { won: number; lost: number; draw: number }): number {
    const total = r.won + r.lost + r.draw;
    if (!total) return 0;
    return Math.round((r.won / total) * 100);
  }
}
