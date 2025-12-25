import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, GameCard, DayAvailability, TimeRange } from '../../models/app.interface';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

// Helper for default weekly availability template
const DEFAULT_WEEK_AVAILABILITY: DayAvailability[] = [
  { key: 'mon', label: 'Lunes', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'tue', label: 'Martes', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'wed', label: 'Miércoles', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'thu', label: 'Jueves', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'fri', label: 'Viernes', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'sat', label: 'Sábado', enabled: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '16:00', end: '20:00' } },
  { key: 'sun', label: 'Domingo', enabled: false, morning: { start: '10:00', end: '12:00' }, afternoon: { start: '17:00', end: '19:00' } },
];

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  // The page can receive a GameCard via route resolver or parent; keeping simple with Input for now
  @Input() gameCard: GameCard | null = null;

  // If you already have a Game model from API, map it to GameCard
  @Input() game: Game | null = null;

  // sport key to determine result UI: 'padel' | 'tennis' | others
  @Input() sportKey: 'padel' | 'tennis' | 'football' | 'basket' | 'other' = 'other';

  // Planning state
  availability = signal<DayAvailability[]>(DEFAULT_WEEK_AVAILABILITY);
  selectedDayKey = signal<DayAvailability['key']>('mon');
  selectedTime: TimeRange = { start: null, end: null };

  // Result state (sets)
  bestOf = signal<3 | 5>(3);
  // Array of set scores: { team1, team2 }
  setScores = signal<{ team1: number | null; team2: number | null }[]>([]);

  // Derived: show planning if no date set
  showPlanning = computed(() => {
    const d = this.game?.date ?? this.gameCard?.date ?? null;
    return !d; // not planned when no start date
  });

  showResult = computed(() => !this.showPlanning());

  // Selected day computed for template usage
  selectedDay = computed(() => this.availability().find(d => d.key === this.selectedDayKey()));

  get selectedMorningStart(): string | null { return this.selectedDay()?.morning.start ?? null; }
  get selectedMorningEnd(): string | null { return this.selectedDay()?.morning.end ?? null; }
  get selectedAfternoonStart(): string | null { return this.selectedDay()?.afternoon.start ?? null; }
  get selectedAfternoonEnd(): string | null { return this.selectedDay()?.afternoon.end ?? null; }

  pageTitle = 'Partido';

  private router = inject(Router);

  ngOnInit() {
    // Prefer reading from History API, which survives reloads
    const navState = (typeof window !== 'undefined' && window.history && window.history.state) ? (window.history.state as { gameCard?: GameCard; game?: Game }) : undefined;

    // Fallback to Angular navigation state (undefined on hard reload)
    const angularState = this.router.getCurrentNavigation()?.extras?.state as { gameCard?: GameCard; game?: Game } | undefined;

    const state = navState ?? angularState;

    if (state?.gameCard) {
      this.gameCard = state.gameCard;
    }
    if (state?.game) {
      this.game = state.game;
    }

    // Infer sport key
    const sport = (this.gameCard as any)?.sport_name as string | undefined
      ?? (this.game as any)?.sport_name as string | undefined
      ?? (this.game as any)?.sport as string | undefined;

    if (sport === 'padel' || sport === 'tennis') {
      this.sportKey = sport;
    } else if (sport === 'football') {
      this.sportKey = 'football';
    } else if (sport === 'basket') {
      this.sportKey = 'basket';
    } else {
      this.sportKey = 'other';
    }

    if (sport) {
      this.pageTitle = `Partido de ${sport}`;
    }

    // initialize setScores based on sport
    if (this.sportKey === 'padel' || this.sportKey === 'tennis') {
      this.bestOf.set(3);
      this.initSets();
    }
  }

  initSets() {
    const count = this.bestOf();
    this.setScores.set(Array.from({ length: count }, () => ({ team1: null, team2: null })));
  }

  onBestOfChange(value: number) {
    const v = value === 5 ? 5 : 3;
    this.bestOf.set(v as 3 | 5);
    this.initSets();
  }

  selectDay(day: DayAvailability) {
    this.selectedDayKey.set(day.key);
    // preset to morning range
    this.selectedTime = { start: day.morning.start, end: day.morning.end };
  }

  pickTime(range: 'morning' | 'afternoon') {
    const day = this.availability().find(d => d.key === this.selectedDayKey());
    if (!day) return;
    this.selectedTime = { start: day[range].start, end: day[range].end };
  }

  savePlanning() {
    // Normally, you'd call a service to persist date/time; we build an ISO-like datetime string
    if (!this.selectedTime.start || !this.selectedTime.end) return;
    const day = this.availability().find(d => d.key === this.selectedDayKey());
    if (!day) return;
    // Placeholder: set game date to today with selected start time
    const today = new Date();
    const [h, m] = (this.selectedTime.start || '09:00').split(':').map(Number);
    today.setHours(h, m, 0, 0);
    const iso = today.toISOString();
    if (this.game) {
      this.game.date = iso;
    } else if (this.gameCard) {
      this.gameCard.date = iso;
    }
  }

  saveResult() {
    // For padel/tennis: serialize set scores like "6-4, 3-6, 7-6"
    if (this.sportKey === 'padel' || this.sportKey === 'tennis') {
      const result = this.setScores()
        .filter(s => s.team1 != null && s.team2 != null)
        .map(s => `${s.team1}-${s.team2}`)
        .join(', ');
      if (this.game) {
        this.game.result = result;
      }
    }
    // TODO: add logic for other sports formats
  }
}
