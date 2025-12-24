import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { CompetitionCardComponent } from '../components/competition-card/competition-card.component';
import { CompetitionCard } from '../../models/app.interface';

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

  results: CompetitionCard[] = [];

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
        name: 'Liga Municipal',
        image: 'assets/images/sample-league-tennis.jpeg',
        sport_id: 2,
        sport_name: '2',
        type: 'league',
        level: 2,
        start_date: '2025-02-10',
        location: 'Polideportivo Sur',
        is_open: true,
        is_private: false,
      },
      {
        id: 202,
        name: 'Open Padel Invierno',
        image: 'assets/images/sample-league-padel.jpeg',
        sport_id: 1,
        sport_name: '1',
        type: 'tournament',
        level: 3,
        start_date: '2025-01-20',
        location: 'Real Club de Tenis',
        is_open: true,
        is_private: true,
      },
    ];
  }

  requestJoin(competition: CompetitionCard) {
    if (!competition.is_open) return;

    if (competition.is_private) {
      const code = this.accessCodes[competition.id];
      if (!this.isValidCode(code)) {
        alert('Introduce un código de acceso de 6 cifras');
        return;
      }
      // TODO: send join request including access code
      console.log('Solicitar inscripción privada', competition, 'code:', code);
      alert(`Solicitud de inscripción enviada a "${competition.name}" con código ${code}`);
      return;
    }

    // pública
    console.log('Solicitar inscripción a la competición', competition);
    alert(`Solicitud de inscripción enviada a "${competition.name}"`);
  }
}
