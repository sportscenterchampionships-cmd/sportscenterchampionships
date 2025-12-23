import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayAvailability } from '../../models/app.interface';

@Component({
  selector: 'app-team-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-availability.component.html',
  styleUrls: ['./team-availability.component.css'],
})
export class TeamAvailabilityComponent {
  // Default days configuration
  days: DayAvailability[] = [
    { key: 'mon', label: 'Lunes', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'tue', label: 'Martes', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'wed', label: 'Miércoles', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'thu', label: 'Jueves', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'fri', label: 'Viernes', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'sat', label: 'Sábado', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
    { key: 'sun', label: 'Domingo', enabled: true, morning: { start: null, end: null }, afternoon: { start: '18:30', end: '23:00' } },
  ];
}
