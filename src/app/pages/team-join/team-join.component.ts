import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Team, Competition } from '../../models/app.interface';
import { TeamCardComponent } from '../components/team-card/team-card.component';

@Component({
  selector: 'app-team-join',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent, TeamCardComponent],
  templateUrl: 'team-join.component.html',
  styleUrls: ['team-join.component.css'],
})
export class TeamJoinComponent {
  filters = {
    name: '',
    gender: '',
    level: '',
    sport: '',
    center: '',
  };

  results: Team[] = [];

  search() {
    // TODO: llamar servicio/endpoint; de momento simulado
    this.results = [
      { id: 1, name: 'Los Pádelistas', sport_id: 3, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' },
      { id: 2, name: 'Futboleros', sport_id: 2, image: 'assets/images/team-default.png', gender: 'male', active: true, created_at: '', updated_at: '' },
      { id: 3, name: 'Volley Queens', sport_id: 4, image: 'assets/images/team-default.png', gender: 'female', active: true, created_at: '', updated_at: '' },
    ];
  }

  requestJoin(team: Team) {
    // TODO: enviar solicitud de unión (Supabase/servicio)
    console.log('Solicitar unión al equipo', team);
    alert(`Solicitud enviada a "${team.name}"`);
  }
}
