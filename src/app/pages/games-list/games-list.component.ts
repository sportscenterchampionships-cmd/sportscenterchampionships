import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameCard } from '../../models/app.interface';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, FormsModule, GameCardComponent, BackButtonComponent],
  template: `
  <section class="games-list-section container py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <app-back-button ariaLabel="Volver" [iconOnly]="true"></app-back-button>
        <h2 class="fw-bold mb-0">Calendario de partidos</h2>
      </div>
    </div>

    <form class="filters mb-3">
      <div class="row g-2">
        <div class="col-6 col-md-4">
          <input class="form-control" type="text" placeholder="Filtrar por equipo" [(ngModel)]="teamFilter" name="teamFilter" (ngModelChange)="applyFilters()" />
        </div>
        <div class="col-6 col-md-4">
          <input class="form-control" type="text" placeholder="Filtrar por deporte" [(ngModel)]="sportFilter" name="sportFilter" (ngModelChange)="applyFilters()" />
        </div>
        <div class="col-6 col-md-4">
          <input class="form-control" type="text" placeholder="Filtrar por club" [(ngModel)]="clubFilter" name="clubFilter" (ngModelChange)="applyFilters()" />
        </div>
        <div class="col-6 col-md-4">
          <select class="form-select" [(ngModel)]="statusFilter" name="statusFilter" (ngModelChange)="applyFilters()">
            <option value="">Estado (todos)</option>
            <option value="scheduled">Programado</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Finalizado</option>
          </select>
        </div>
        <div class="col-6 col-md-4">
          <input class="form-control" type="date" [(ngModel)]="dateFilter" name="dateFilter" (ngModelChange)="applyFilters()" />
        </div>
        <div class="col-6 col-md-4 d-flex gap-2">
          <select class="form-select" [(ngModel)]="sortBy" name="sortBy" (ngModelChange)="applyFilters()">
            <option value="date">Ordenar por fecha</option>
            <option value="status">Ordenar por estado</option>
          </select>
          <select class="form-select" [(ngModel)]="sortDir" name="sortDir" (ngModelChange)="applyFilters()">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
    </form>

    <div class="games-grid">
      <app-game-card *ngFor="let game of filteredGames" [game]="game" (click)="onOpenGame(game)"></app-game-card>
    </div>

    <div *ngIf="filteredGames.length === 0" class="empty-card mt-3">
      <div class="empty-card-body">
        <div class="empty-info">
          <p class="mb-1 fw-bold">No hay partidos con esos filtros</p>
          <small>Ajusta los filtros para ver resultados.</small>
        </div>
      </div>
    </div>
  </section>
  `,
  styles: [
    `.games-list-section .games-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}`,
    `.filters .form-control,.filters .form-select{width:100%}`
  ]
})
export class GamesListComponent {
  allGames: GameCard[] = [];
  filteredGames: GameCard[] = [];

  // filters
  teamFilter: string = '';
  sportFilter: string = '';
  clubFilter: string = '';
  statusFilter: string = '';
  dateFilter: string = ''; // YYYY-MM-DD

  // sorting
  sortBy: 'date' | 'status' = 'date';
  sortDir: 'asc' | 'desc' = 'asc';

  constructor(private router: Router) {
    this.seedGames();
    this.applyFilters();
  }

  seedGames() {
    this.allGames = [
      { id: 1, competition_id: 1, date: '2025-01-02T18:30:00', type: 'league', sport_id: 'tennis', sport_name: 'tennis', level: 3, location: 'Club Centro', team1: { id: 101, name: 'Ace Masters', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 102, name: 'Clay Warriors', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'completed', result: '6-4, 3-6, 7-6' },
      { id: 2, competition_id: 2, date: '2025-01-05T19:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, location: 'Padel Norte', team1: { id: 201, name: 'Padel Smash', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 202, name: 'Golden Racket', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 3, competition_id: 1, date: '2025-01-12T20:00:00', type: 'league', sport_id: 'tennis', sport_name: 'tennis', level: 3, location: 'Club Sur', team1: { id: 103, name: 'Topspin United', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 104, name: 'Baseline Kings', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'pending' },
      { id: 4, competition_id: 2, date: '2025-01-17T21:00:00', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, location: 'Padel Este', team1: { id: 203, name: 'Red Net Padel', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 204, name: 'Vibora Team', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 5, competition_id: 3, date: '2025-02-01T18:00:00', type: 'friendly', sport_id: 'tennis', sport_name: 'tennis', level: 4, location: 'Club Oeste', team1: { id: 105, name: 'Match Point', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 106, name: 'Deuce Squad', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 6, competition_id: 4, date: '', type: 'friendly', sport_id: 'football', sport_name: 'football', level: 3, location: 'Campo Norte', team1: { id: 301, name: 'Los Tigres', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 302, name: 'Azul FC', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'pending' },
      { id: 7, competition_id: 5, date: '2025-01-23T17:00:00', type: 'league', sport_id: 'basket', sport_name: 'basket', level: 2, location: 'Pabellón Central', team1: { id: 401, name: 'Basket Bulls', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 402, name: 'Hoop Heroes', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'completed', result: '82-79' },
      { id: 8, competition_id: 6, date: '2025-01-28T20:30:00', type: 'league', sport_id: 'padel', sport_name: 'padel', level: 1, location: 'Padel Sur', team1: { id: 205, name: 'Smash Crew', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 206, name: 'Cross Court', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 9, competition_id: 7, date: '', type: 'league', sport_id: 'tennis', sport_name: 'tennis', level: 5, location: 'Club Norte', team1: { id: 107, name: 'Spin Doctors', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 108, name: 'Serve & Volley', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'pending' },
      { id: 10, competition_id: 8, date: '2025-02-12T19:15:00', type: 'friendly', sport_id: 'basket', sport_name: 'basket', level: 3, location: 'Pabellón Norte', team1: { id: 403, name: 'Dunk Masters', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 404, name: 'Net Runners', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 11, competition_id: 9, date: '2025-02-18T21:00:00', type: 'league', sport_id: 'football', sport_name: 'football', level: 4, location: 'Campo Este', team1: { id: 303, name: 'Verde FC', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 304, name: 'Rojo United', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 12, competition_id: 10, date: '2025-02-25T20:00:00', type: 'league', sport_id: 'tennis', sport_name: 'tennis', level: 2, location: 'Club Central', team1: { id: 109, name: 'Baseline Crew', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 110, name: 'Grand Slammers', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 13, competition_id: 11, date: '', type: 'friendly', sport_id: 'padel', sport_name: 'padel', level: 2, location: 'Padel Club Oeste', team1: { id: 207, name: 'Padel Pros', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 208, name: 'Backglass Team', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'pending' },
      { id: 14, competition_id: 12, date: '2025-03-02T18:30:00', type: 'league', sport_id: 'basket', sport_name: 'basket', level: 1, location: 'Pabellón Sur', team1: { id: 405, name: 'Triple Threat', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 406, name: 'Fast Breakers', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'pending' },
      { id: 15, competition_id: 13, date: '2025-01-30T16:00:00', type: 'friendly', sport_id: 'football', sport_name: 'football', level: 2, location: 'Campo Central', team1: { id: 305, name: 'Toros FC', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 306, name: 'Leones FC', sport_id: 3, sport_name: 'football', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'completed', result: '2-1' },
      { id: 16, competition_id: 14, date: '', type: 'league', sport_id: 'tennis', sport_name: 'tennis', level: 3, location: 'Club Este', team1: { id: 111, name: 'Top Court', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 112, name: 'Drop Shotters', sport_id: 1, sport_name: 'tennis', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 17, competition_id: 15, date: '2025-03-10T19:45:00', type: 'league', sport_id: 'padel', sport_name: 'padel', level: 4, location: 'Padel Este', team1: { id: 209, name: 'Net Chasers', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 210, name: 'Court Kings', sport_id: 2, sport_name: 'padel', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' },
      { id: 18, competition_id: 16, date: '2025-02-07T20:30:00', type: 'friendly', sport_id: 'basket', sport_name: 'basket', level: 2, location: 'Pabellón Oeste', team1: { id: 407, name: 'Sky Dunkers', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, team2: { id: 408, name: 'Rim Rockers', sport_id: 4, sport_name: 'basket', image: 'assets/images/team-default.png', gender: 'mixed' }, status: 'scheduled' }
    ];
  }

  applyFilters() {
    let list = [...this.allGames];

    // filtering
    if (this.teamFilter) {
      const t = this.teamFilter.toLowerCase();
      list = list.filter(g => g.team1?.name.toLowerCase().includes(t) || g.team2?.name.toLowerCase().includes(t));
    }
    if (this.sportFilter) {
      const s = this.sportFilter.toLowerCase();
      list = list.filter(g => (g.sport_name || g.sport_id)?.toString().toLowerCase().includes(s));
    }
    if (this.clubFilter) {
      const c = this.clubFilter.toLowerCase();
      list = list.filter(g => (g as any).club && (g as any).club.toLowerCase().includes(c));
    }
    if (this.statusFilter) {
      const st = this.statusFilter.toLowerCase();
      list = list.filter(g => (g.status || '').toLowerCase() === st);
    }
    if (this.dateFilter) {
      list = list.filter(g => (g.date || '').startsWith(this.dateFilter));
    }

    // sorting
    list.sort((a, b) => {
      if (this.sortBy === 'date') {
        const da = a.date ? new Date(a.date).getTime() : (this.sortDir === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
        const db = b.date ? new Date(b.date).getTime() : (this.sortDir === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
        return this.sortDir === 'asc' ? da - db : db - da;
      } else {
        const sa = (a.status || '').toLowerCase();
        const sb = (b.status || '').toLowerCase();
        if (sa < sb) return this.sortDir === 'asc' ? -1 : 1;
        if (sa > sb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      }
    });

    this.filteredGames = list;
  }

  onOpenGame(game: GameCard) {
    this.router.navigate(['/game'], { state: { gameId: game.id } });
  }
}
