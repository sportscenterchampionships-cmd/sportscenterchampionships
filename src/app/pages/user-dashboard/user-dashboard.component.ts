import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CompetitionCard, GameWithTeams, TeamCard } from "../../models/app.interface";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  user = {
    name: 'Albert',
    avatar: 'assets/images/default-avatar.jpg',
  };

  teams: TeamCard[] = [];
  games: GameWithTeams[] = [];
  competitions: CompetitionCard[] = [];

}
