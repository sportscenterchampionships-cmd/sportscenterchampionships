import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { CompetitionCardComponent } from '../components/competition-card/competition-card.component';
import { Competition } from '../../models/app.interface';

@Component({
  selector: 'app-competition-join',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent, CompetitionCardComponent],
  templateUrl: 'competition-join.component.html',
  styleUrls: ['competition-join.component.css'],
})
export class CompetitionJoinComponent {
  filters = {
    name: '',
    sport: '',
    type: '',
    level: '',
    center: '',
  };

  results: Competition[] = [];

  // store access codes keyed by competition id
  accessCodes: Record<number, string> = {};

  private isValidCode(code?: string) {
    return /^\d{6}$/.test(String(code ?? '').trim());
  }

  search() {
    // TODO: Replace with service integration
    this.results = [
      {
        id: 101,
        sport_id: 2,
        name: 'Liga Municipal',
        type: 1,
        level: 2,
        min_teams: null,
        max_teams: null,
        min_players_per_team: null,
        max_players_per_team: null,
        start_date: '2025-02-10',
        end_date: null,
        location: null,
        timezone: null,
        organizer_name: null,
        organizer_email: null,
        organizer_phone: null,
        is_open: true,
        status: 'iniciada',
        back_to_back: null,
        allow_draws: true,
        points_win: 3,
        points_draw: 1,
        points_loss: 0,
        fee_amount: null,
        fee_currency: null,
        description: null,
        rules_url: null,
        prizes: null,
        banner_url: null,
        is_public: true
      },
      {
        id: 202,
        sport_id: 1,
        name: 'Open Padel Invierno',
        type: 2,
        level: 3,
        min_teams: null,
        max_teams: null,
        min_players_per_team: null,
        max_players_per_team: null,
        start_date: '2025-01-20',
        end_date: null,
        location: null,
        timezone: null,
        organizer_name: null,
        organizer_email: null,
        organizer_phone: null,
        is_open: true,
        status: 'en_espera',
        back_to_back: null,
        allow_draws: true,
        points_win: 3,
        points_draw: 1,
        points_loss: 0,
        fee_amount: null,
        fee_currency: null,
        description: null,
        rules_url: null,
        prizes: null,
        banner_url: null,
        is_public: true,
        is_private: true
      },
    ];
  }

  requestJoin(competition: Competition) {
    if (!competition.is_open) return;

    if (competition.is_private) {
      const code = this.accessCodes[competition.id!];
      if (!this.isValidCode(code)) {
        alert('Introduce un código de acceso de 6 cifras');
        return;
      }
      console.log('Solicitar inscripción privada', competition, 'code:', code);
      alert(`Solicitud de inscripción enviada a "${competition.name}" con código ${code}`);
      return;
    }

    console.log('Solicitar inscripción a la competición', competition);
    alert(`Solicitud de inscripción enviada a "${competition.name}"`);
  }
}
