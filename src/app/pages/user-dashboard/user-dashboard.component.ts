import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { MyGamesComponent } from "../components/my-games/my-games.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MyTeamsComponent } from "../components/my-teams/my-teams.component";
import { MyCompetitionsComponent } from "../components/my-competitions/my-competitions.component";
import { Team, Competition, Game } from '../../models/app.interface';

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

  teams: Team[] = [
    { id: 1, name: 'Ace Masters', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' },
    { id: 2, name: 'Baseline Kings', sport_id: 1, image: 'assets/images/team-default.png', gender: 'mixed', active: true, created_at: '', updated_at: '' }
  ];

  competitions: Competition[] = [
    { id: 1, sport_id: 1, name: 'Liga Club Tenis', type: 1, level: 3, min_teams: null, max_teams: null, min_players_per_team: null, max_players_per_team: null, start_date: '2025-01-15', end_date: null, location: null, timezone: null, organizer_name: null, organizer_email: null, organizer_phone: null, is_open: true, status: 'iniciada', back_to_back: null, allow_draws: true, points_win: 3, points_draw: 1, points_loss: 0, fee_amount: null, fee_currency: null, description: null, rules_url: null, prizes: null, banner_url: null, is_public: true },
    { id: 2, sport_id: 1, name: 'Torneo de Invierno', type: 2, level: 3, min_teams: null, max_teams: null, min_players_per_team: null, max_players_per_team: null, start_date: '2025-02-01', end_date: null, location: null, timezone: null, organizer_name: null, organizer_email: null, organizer_phone: null, is_open: false, status: 'en_espera', back_to_back: null, allow_draws: true, points_win: 3, points_draw: 1, points_loss: 0, fee_amount: null, fee_currency: null, description: null, rules_url: null, prizes: null, banner_url: null, is_public: true }
  ];

  games: Game[] = [
    { id: 101, competition_id: 1, date: null, type: 'league', sport_id: 'padel', sport_name: 'padel', location: null, level: 3, team1: this.teams[0], team2: this.teams[1], status: 'scheduled', updated_at: '', created_at: '' },
    { id: 102, competition_id: 1, date: '2025-01-29T19:00:00', type: 'league', sport_id: 'tennis', sport_name: 'tennis', location: 'Club Deportivo Central', level: 3, team1: this.teams[1], team2: this.teams[0], status: 'pending', updated_at: '', created_at: '' },
    { id: 201, competition_id: 2, date: '2025-02-05T20:00:00', type: 'tournament', sport_id: 'tennis', sport_name: 'tennis', location: 'Real Club de Tenis', level: 3, team1: this.teams[0], team2: this.teams[1], status: 'completed', result: '6-4, 3-6, 7-6', updated_at: '', created_at: '' },
    { id: 202, competition_id: 2, date: '2025-02-12T20:30:00', type: 'tournament', sport_id: 'tennis', sport_name: 'tennis', location: 'Real Club de Tenis', level: 3, team1: this.teams[1], team2: this.teams[0], status: 'scheduled', updated_at: '', created_at: '' }
  ];

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }
}
