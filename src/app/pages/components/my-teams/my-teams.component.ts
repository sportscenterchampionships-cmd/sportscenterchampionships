import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Team, TeamCard } from '../../../models/app.interface';
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
  @Input() teams!: TeamCard[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.teams) {
      this.teams = [
        { id: 1, name: 'Equipo ejemplo', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }
      ];
    }
  }

  // add/new actions
  onCreateTeam() {
    // navigate to team creation form
    this.router.navigate(['/team']);
  }

  onJoinTeam() {
    // navigate to team join flow
    this.router.navigate(['/team/join']);
  }
}
