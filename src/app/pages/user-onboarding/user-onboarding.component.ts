import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-onboarding',
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-onboarding.component.html',
  styleUrl: './user-onboarding.component.css'
})
export class UserOnboardingComponent {
  profile = {
    name: '',
    email: '',
    phone: '',
    avatar_url: '',
  };
  
  sports = [
    { key: 'padel', label: 'Pádel', selected: false, level: '' },
    { key: 'tenis', label: 'Tenis', selected: false, level: '' },
    { key: 'baloncesto', label: 'Baloncesto', selected: false, level: '' },
    { key: 'futbol', label: 'Fútbol', selected: false, level: '' },
  ];
  
  async saveProfile() {
    // 1. Guardar user
    // 2. Guardar deportes seleccionados
    // 3. Redirigir a dashboard
  }
  
}
