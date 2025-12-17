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
  };

  loading = false;


sports: SportCard[] = [
{
key: 'padel',
name: 'Pádel',
image: 'assets/images/sports/padel/padel-player-man.jpeg',
color: 'color-padel',
selected: false,
},
{
key: 'tennis',
name: 'Tenis',
image: 'assets/images/sports/tennis/tennis-player-woman.jpeg',
color: 'color-tenis',
selected: false,
},
{
key: 'basket',
name: 'Baloncesto',
image: 'assets/images/sports/basket/basket-player-man.jpeg',
color: 'color-basket',
selected: false,
},
{
key: 'football',
name: 'Fútbol',
image: 'assets/images/sports/football/football-player-woman.jpeg',
color: 'color-football',
selected: false,
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


toggleSport(sport: SportCard) {
sport.selected = !sport.selected;
}


async saveProfile() {
this.loading = true;


const selectedSports = this.sports
.filter((s) => s.selected)
.map((s) => s.key);


console.log('Perfil:', this.profile);
console.log('Deportes:', selectedSports);

}

}
