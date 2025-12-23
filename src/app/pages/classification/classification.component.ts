import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent {
  competitionId!: number;

  hasLoses: boolean = true;

  // Dummy data for now. Replace with real service call.
  rows: Array<{ position: number; team: string; played: number; won: number; draw: number; lost: number; points: number }> = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.competitionId = idParam ? Number(idParam) : 0;
    // TODO: fetch classification by competitionId
    this.rows = [
      { position: 1, team: 'Equipo A', played: 10, won: 8, draw: 1, lost: 1, points: 25 },
      { position: 2, team: 'Equipo B', played: 10, won: 7, draw: 2, lost: 1, points: 23 },
      { position: 3, team: 'Equipo C', played: 10, won: 5, draw: 3, lost: 2, points: 18 },
    ];
  }

  // Calculates win percentage similar to the design (rounded to whole number)
  getWinPct(r: { won: number; lost: number; draw: number }): number {
    const total = r.won + r.lost + r.draw;
    if (!total) return 0;
    return Math.round((r.won / total) * 100);
  }
}
