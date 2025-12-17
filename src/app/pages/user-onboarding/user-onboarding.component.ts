import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase.service';

interface SportCard {
  key: string;
  name: string;
  image: string;
  color: string;
  selected: boolean;
  level?: string;
  disabled?: boolean;
  }
@Component({
  selector: 'app-user-onboarding',
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-onboarding.component.html',
  styleUrls: ['./user-onboarding.component.css']
})


export class UserOnboardingComponent {
  profile = {
    name: '',
    email: '',
    password: '',
    phone: '',
    language: 'es',
    avatar_url: '',
    zone: '',
    city: '',
    position: '',
    birthdate: '',
    gender: '',
    notifications: true
  };

  loading = false;


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



constructor(private supabase: SupabaseService) {}


async onAvatarSelected(event: any) {
const file = event.target.files[0];
if (!file) return;


const filePath = `avatars/${Date.now()}-${file.name}`;


const { error } = await this.supabase.uploadAvatar(filePath, file);
if (!error) {
this.profile.avatar_url = this.supabase.getPublicAvatarUrl(filePath);
}
}


toggleSport(sport: any) {
  if (sport.disabled) {
    return;
  }

  sport.selected = !sport.selected;

  if (!sport.selected) {
    sport.level = '';
  }
}



  async saveProfile() {
    this.loading = true;
    const selectedSports = this.sports
      .filter(s => s.selected)
      .map(s => ({
        sport: s.key,
        level: s.level,
      }));

    console.log('Perfil:', this.profile);
    console.log('Deportes:', selectedSports);

  }

}
