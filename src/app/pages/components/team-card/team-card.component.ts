import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TeamCard } from "../../../models/app.interface";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team?: TeamCard;
  @Input() isAdd = false;
}
