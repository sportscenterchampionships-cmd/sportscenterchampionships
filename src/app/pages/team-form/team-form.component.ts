import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamAvailabilityComponent } from '../team-availability/team-availability.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SportCenterComponent } from '../../components/sport-center/sport-center.component';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TeamAvailabilityComponent, BackButtonComponent, SportCenterComponent],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
})
export class TeamFormComponent {
  team = {
    name: '',
    gender: 'mixed',
    level: '',
    category: '',
    sport_id: null,
    max_players: null,
    image: '',
  };

  submit() {
    console.log('Equipo:', this.team);
    // Supabase insert aquí
  }
}
