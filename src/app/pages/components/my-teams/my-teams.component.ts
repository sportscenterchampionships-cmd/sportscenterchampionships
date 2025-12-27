import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../../models/app.interface';
import { TeamCardComponent } from '../team-card/team-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-teams',
  imports: [CommonModule, TeamCardComponent],
  standalone: true,
  templateUrl: './my-teams.component.html',
  styleUrl: './my-teams.component.css'
})
export class MyTeamsComponent implements OnInit {
  @Input() teams!: Team[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.teams) {
      this.teams = [
        { id: 1, name: 'Equipo ejemplo', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }
      ];
    }
  }

  // add/new actions
  onCreateTeam() {
    this.router.navigate(['/team']);
  }

  onJoinTeam() {
    this.router.navigate(['/team/join']);
  }
}
