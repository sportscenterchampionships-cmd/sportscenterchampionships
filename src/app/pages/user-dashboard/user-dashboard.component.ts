import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CompetitionCard, GameCard, TeamCard } from "../../models/app.interface";
import { MyGamesComponent } from "../components/my-games/my-games.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MyTeamsComponent } from "../components/my-teams/my-teams.component";
import { MyCompetitionsComponent } from "../components/my-competitions/my-competitions.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MyTeamsComponent, MyCompetitionsComponent, MyGamesComponent, FooterComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  constructor(private router: Router) {}

  user = {
    name: 'Albert',
    avatar: 'assets/images/default-avatar.jpg',
  };

  teams: TeamCard[] = [ { id: 1, name: 'Ace Masters', sport_id: 1, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, { id: 2, name: 'Baseline Kings', sport_id: 1, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' } ];

  competitions: CompetitionCard[] = [ { id: 1, name: 'Liga Club Tenis', image: null, sport_id: 1, sport_name: 'padel', type: 'league', level: 3, start_date: '2025-01-15', location: 'Club Deportivo Central', is_open: true }, { id: 2, name: 'Torneo de Invierno', image: null, sport_id: 1, sport_name: 'padel', type: 'tournament', level: 3, start_date: '2025-02-01', location: 'Real Club de Tenis', is_open: false } ];

  games: GameCard[] = [
    { id: 101, competition_id: 1, date: '', type: 'league', sport_id: 'padel', sport_name: 'padel', location: 'Club Deportivo Central', level: 3, team1: this.teams[0], team2: this.teams[1], status: 'scheduled' },
    { id: 102, competition_id: 1, date: '2025-01-29T19:00:00', type: 'league', sport_id: 'tennis', sport_name: 'tennis', location: 'Club Deportivo Central', level: 3, team1: this.teams[1], team2: this.teams[0], status: 'pending' },
    { id: 201, competition_id: 2, date: '2025-02-05T20:00:00', type: 'tournament', sport_id: 'tennis', sport_name: 'tennis', location: 'Real Club de Tenis', level: 3, team1: this.teams[0], team2: this.teams[1], status: 'completed' },
    { id: 202, competition_id: 2, date: '2025-02-12T20:30:00', type: 'tournament', sport_id: 'tennis', sport_name: 'tennis', location: 'Real Club de Tenis', level: 3, team1: this.teams[1], team2: this.teams[0], status: 'scheduled' }
  ];

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

  // dashboardData: UserDashboardData = { teams, games, competitions };
}
