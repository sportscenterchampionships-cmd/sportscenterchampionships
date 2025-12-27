import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Competition } from "../../../models/app.interface";
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.css']
})
export class CompetitionCardComponent {
  @Input() competition?: Competition;
  @Input() isAdd = false;
  @Input() isCreator = false;

  constructor(private router: Router) {}

  editCompetition(event: MouseEvent) {
    event.stopPropagation();
    if (!this.competition) return;
    // Navigate to competition form, pass current competition via router state
    this.router.navigate(['/competition'], { state: { competition: this.competition } });
  }

  goToClassification() {
    if (!this.competition) return;
    this.router.navigate(['/classification', this.competition.id]);
  }
}
