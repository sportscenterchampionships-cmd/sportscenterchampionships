import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/core/supabase.service';
import { SportCard } from '../../models/app.interface';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { SportsSelectorComponent } from '../components/sports-selector/sports-selector.component';


@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    FormsModule,
    SportsSelectorComponent
  ],
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent {
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
  avatarFile: File | null = null;


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

selectedSports: SportCard[] = [];

private supabase = inject(SupabaseService);
private userService = inject(UserService);
private router = inject(Router);

constructor() {}


async onAvatarSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;
  const urlImg = await this.supabase.uploadAvatar(file);
  if (urlImg) {
    this.profile.avatar_url = urlImg;
  }
}

onSportsSelected(sports: SportCard[]) {
  this.selectedSports = sports;
}

async saveProfile() {
  try {
    this.loading = true;

    const { data, error: signUpError } = await this.supabase.signUp(
      this.profile.email,
      this.profile.password
    );

    if (signUpError) throw signUpError;


    if (this.avatarFile) {
      this.profile.avatar_url =
      await this.supabase.uploadAvatar(this.avatarFile);
    }

    await this.userService.createUser({
      name: this.profile.name,
      email: this.profile.email,
      avatar_url: this.profile.avatar_url,
      language: this.profile.language,
      birth_date: this.profile.birthdate,
      gender: this.profile.gender,
      position: this.profile.position,
      notifications: this.profile.notifications,
      city: this.profile.city,
      zone: this.profile.zone,
    });

    // Loguear inmediatamente
    const { data: loginData, error: loginError } = await this.supabase.signInWithEmail(
      this.profile.email,
      this.profile.password
    );
    if (loginError) throw loginError;
    console.log('Login after sign up:', loginData);
  } catch (err) {
    console.error(err);
  } finally {
    this.loading = false;
    this.router.navigate(['/user_onboarding']);
  }
}

goToNextTest() {
  this.router.navigate(['/dashboard']);
}


}
