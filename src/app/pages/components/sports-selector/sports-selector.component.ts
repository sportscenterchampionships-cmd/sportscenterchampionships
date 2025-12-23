import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SportCard } from '../../../models/app.interface';

@Component({
  selector: 'app-sports-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sports-selector.component.html',
  styleUrls: ['./sports-selector.component.css'],
})
export class SportsSelectorComponent implements OnInit {
  @Input() initialSports: SportCard[] | null = null;
  @Input() showLevel: boolean = false;
  @Output() sportsSelected = new EventEmitter<SportCard[]>();

  sports: SportCard[] = [
    {
      key: 'padel',
      name: 'Pádel',
      image: 'assets/images/sports/padel/padel-player-man.jpeg',
      color: 'color-padel',
      selected: false,
      level: '',
      disabled: false,
    },
    {
      key: 'tennis',
      name: 'Tenis',
      image: 'assets/images/sports/tennis/tennis-player-woman.jpeg',
      color: 'color-tenis',
      selected: false,
      level: '',
      disabled: false,
    },
    {
      key: 'basket',
      name: 'Baloncesto',
      image: 'assets/images/sports/basket/basket-player-man.jpeg',
      color: 'color-baloncesto',
      selected: false,
      level: '',
      disabled: true,
    },
    {
      key: 'football',
      name: 'Fútbol',
      image: 'assets/images/sports/football/football-player-woman.jpeg',
      color: 'color-futbol',
      selected: false,
      level: '',
      disabled: true,
    },
  ];

  ngOnInit(): void {
    if (this.initialSports && this.initialSports.length) {
      // Merge initial config
      const map = new Map(this.initialSports.map((s) => [s.key, s] as const));
      this.sports = this.sports.map((s) => {
        const init = map.get(s.key);
        return init ? { ...s, ...init } : s;
      });
      this.emitSelected();
    }
  }

  toggleSport(sport: SportCard) {
    if (sport.disabled) return;
    sport.selected = !sport.selected;
    if (!sport.selected) sport.level = '';
    this.emitSelected();
  }

  private emitSelected() {
    const selected = this.sports.filter((s) => s.selected);
    this.sportsSelected.emit(selected);
  }
}
