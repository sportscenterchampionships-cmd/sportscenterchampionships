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
        is_open: false,
      },
    ];
  }

  requestJoin(competition: CompetitionCard) {
    // TODO: send join/enrollment request via service (e.g., Supabase)
    console.log('Solicitar inscripción a la competición', competition);
    alert(`Solicitud de inscripción enviada a "${competition.name}"`);
  }
}
