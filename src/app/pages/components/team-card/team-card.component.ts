import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from '@angular/router';
import { Team } from "../../../models/app.interface";

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team?: Team;
  @Input() isAdd = false;
}
