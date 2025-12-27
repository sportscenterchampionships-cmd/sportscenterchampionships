import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Competition } from '../../../models/app.interface';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-competitions',
  imports: [CommonModule, FormsModule, CompetitionCardComponent],
  standalone: true,
  templateUrl: './my-competitions.component.html',
  styleUrl: './my-competitions.component.css'
})
export class MyCompetitionsComponent implements OnInit {
  @Input() competitions!: Competition[];

  accessCode: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.competitions) {
      this.competitions = [
        { id: 1, sport_id: 1, name: 'Campeonato ejemplo', type: 1, level: 3, min_teams: null, max_teams: null, min_players_per_team: null, max_players_per_team: null, start_date: '2025-01-15', end_date: null, location: null, timezone: null, organizer_name: null, organizer_email: null, organizer_phone: null, is_open: true, status: 'iniciada', back_to_back: null, allow_draws: true, points_win: 3, points_draw: 1, points_loss: 0, fee_amount: null, fee_currency: null, description: null, rules_url: null, prizes: null, banner_url: null, is_public: true }
      ];
    }
  }

  // add/new actions
  onCreateCompetition() {
    // navigate to competition creation form
    this.router.navigate(['/competition']);
  }

  onJoinCompetition() {
    const code = String(this.accessCode || '').trim();
    if (code && !/^\d{6}$/.test(code)) {
      alert('Introduce un código de acceso de 6 cifras');
      return;
    }
    const extras = code ? { queryParams: { code } } : undefined as any;
    this.router.navigate(['/competition/join'], extras);
  }
}
