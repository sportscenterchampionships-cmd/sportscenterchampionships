import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, DayAvailability, TimeRange } from '../../models/app.interface';
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
  @Input() game: Game | null = null;
  @Input() sportKey: 'padel' | 'tennis' | 'football' | 'basket' | 'other' = 'other';

  // Planning state
  availability = signal<DayAvailability[]>(DEFAULT_WEEK_AVAILABILITY);
  selectedDayKey = signal<DayAvailability['key']>('mon');
  selectedTime: TimeRange = { start: null, end: null };

  // Result state (sets)
  bestOf = signal<3 | 5>(3);
  setScores = signal<{ team1: number | null; team2: number | null }[]>([]);

  // UI state: show panels via user action
  showAvailabilityPanel = signal<boolean>(false);
  showReservationPanel = signal<boolean>(false);

  // Reservation form state (simple local state)
  centers = [
    { id: 'sc-1', name: 'Sports Center Norte' },
    { id: 'sc-2', name: 'Polideportivo Central' },
    { id: 'sc-3', name: 'Club Deportivo Sur' },
  ];
  courtsByCenter: Record<string, string[]> = {
    'sc-1': ['Pista 1', 'Pista 2'],
    'sc-2': ['Pista A', 'Pista B', 'Pista C'],
    'sc-3': ['Cancha 1'],
  };
  selectedCenterId: string | null = null;
  selectedCourt: string | null = null;
  selectedReservationDate: string | null = null; // yyyy-MM-dd
  selectedReservationTime: string | null = null; // HH:mm

  // Derived: match planned when date exists
  plannedDate = computed(() => this.game?.date ?? null);
  isPlanned = computed(() => {
    const status = this.game?.status ?? null;
    const byStatus = status === 'scheduled' || status === 'pending';
    return !!this.plannedDate() || byStatus;
  });
  hasLocation = computed(() => !!(this.game?.location));
  isPastOrNow = computed(() => {
    const d = this.plannedDate();
    if (!d) return false;
    const planned = new Date(d).getTime();
    const now = Date.now();
    return now >= planned;
  });
  isCompleted = computed(() => !!this.game?.result);

  // Visibility per spec
  showPlanning = computed(() => this.isPlanned() && !this.hasLocation() && this.showAvailabilityPanel());
  showReservation = computed(() => this.isPlanned() && !this.hasLocation() && this.showReservationPanel());
  showResultEntry = computed(() => this.isPlanned() && this.isPastOrNow() && !this.isCompleted());
  showResultInfo = computed(() => this.isCompleted());

  // Selected day computed for template usage
  selectedDay = computed(() => this.availability().find(d => d.key === this.selectedDayKey()));

  get selectedMorningStart(): string | null { return this.selectedDay()?.morning.start ?? null; }
  get selectedMorningEnd(): string | null { return this.selectedDay()?.morning.end ?? null; }
  get selectedAfternoonStart(): string | null { return this.selectedDay()?.afternoon.start ?? null; }
  get selectedAfternoonEnd(): string | null { return this.selectedDay()?.afternoon.end ?? null; }

  pageTitle = 'Partido';

  private router = inject(Router);

  ngOnInit() {
    const navState = (typeof window !== 'undefined' && window.history && window.history.state) ? (window.history.state as { game?: Game }) : undefined;
    const angularState = this.router.getCurrentNavigation()?.extras?.state as { game?: Game } | undefined;
    const state = navState ?? angularState;

    if (state?.game) {
      this.game = state.game;
    }

    const sport = this.game?.sport_name as string | undefined;

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
    this.selectedTime = { start: day.morning.start, end: day.morning.end };
  }

  pickTime(range: 'morning' | 'afternoon') {
    const day = this.availability().find(d => d.key === this.selectedDayKey());
    if (!day) return;
    this.selectedTime = { start: day[range].start, end: day[range].end };
  }

  savePlanning() {
    if (!this.selectedTime.start || !this.selectedTime.end) return;
    const day = this.availability().find(d => d.key === this.selectedDayKey());
    if (!day) return;
    const today = new Date();
    const [h, m] = (this.selectedTime.start || '09:00').split(':').map(Number);
    today.setHours(h, m, 0, 0);
    const iso = today.toISOString();
    if (this.game) {
      this.game.date = iso;
    }
  }

  saveResult() {
    if (this.sportKey === 'padel' || this.sportKey === 'tennis') {
      const result = this.setScores()
        .filter(s => s.team1 != null && s.team2 != null)
        .map(s => `${s.team1}-${s.team2}`)
        .join(', ');
      if (this.game) {
        this.game.result = result;
      }
    }
  }

  toggleAvailabilityPanel() {
    if (!(this.isPlanned() && !this.hasLocation())) return;
    const next = !this.showAvailabilityPanel();
    this.showAvailabilityPanel.set(next);
    this.showReservationPanel.set(next);
  }

  openReservationPanel() {
    this.showReservationPanel.set(true);
    this.showAvailabilityPanel.set(false);
  }

  onCenterChange(centerId: string) {
    this.selectedCenterId = centerId;
    const courts = this.courtsByCenter[centerId] || [];
    this.selectedCourt = courts.length ? courts[0] : null;
  }

  onReservationDateChange(dateStr: string) {
    this.selectedReservationDate = dateStr;
  }

  onReservationTimeChange(timeStr: string) {
    this.selectedReservationTime = timeStr;
  }

  sendReservationToRival() {
    if (!this.selectedCenterId || !this.selectedCourt || !this.selectedReservationDate || !this.selectedReservationTime) {
      return;
    }
    if (this.game) {
      const centerName = this.centers.find(c => c.id === this.selectedCenterId)?.name || 'Centro';
      this.game.location = `${centerName} · ${this.selectedCourt}`;
    }
  }
}
