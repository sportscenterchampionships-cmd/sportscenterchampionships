import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Competition, CompetitionCard } from '../../../models/app.interface';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-competitions',
  imports: [CommonModule, CompetitionCardComponent],
  standalone: true,
  templateUrl: './my-competitions.component.html',
  styleUrl: './my-competitions.component.css'
})
export class MyCompetitionsComponent implements OnInit {
  @Input() competitions!: CompetitionCard[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.competitions) {
      this.competitions = [
        { id: 1, name: 'Campeonato ejemplo', sport_id: 1, sport_name: 'tennis', image: 'assets/images/sample-league-tennis.jpeg', is_open: true }
      ];
    }
  }

  // add/new actions
  onCreateCompetition() {
    // navigate to competition creation form
    this.router.navigate(['/competition']);
  }

  onJoinCompetition() {
    // navigate to competition join flow
    this.router.navigate(['/competition/join']);
  }
}
