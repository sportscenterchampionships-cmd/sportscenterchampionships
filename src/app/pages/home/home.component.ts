import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Sport {
  id: number;
  name: string;
  image: string;
  color: string;
  nextEvent: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sports: Sport[] = [
    {
      id: 4,
      name: 'Pádel',
      image: 'assets/images/sports/padel/padel-player-man.jpeg',
      color: 'color-padel',
      nextEvent: '28 Sep · 21:00',
    },
    {
      id: 3,
      name: 'Tenis',
      image: 'assets/images/sports/tennis/tennis-player-woman.jpeg',
      color: 'color-tenis',
      nextEvent: '25 Sep · 10:00',
    },
    {
      id: 2,
      name: 'Baloncesto',
      image: 'assets/images/sports/basket/basket-player-man.jpeg',
      color: 'color-baloncesto',
      nextEvent: '22 Sep · 19:30',
    },
    {
      id: 1,
      name: 'Fútbol',
      image: 'assets/images/sports/football/football-player-woman.jpeg',
      color: 'color-futbol',
      nextEvent: '20 Sep · 18:00',
    },
  ];

  games = [
    {
      competition_id: 1,
      team1_name: 'Ace Masters',
      team2_name: 'Clay Warriors',
      date: '2025-01-22T18:30:00',
      type: 'tennis',
      location: 'Club Deportivo Central'
    },
    {
      competition_id: 2,
      team1_name: 'Padel Smash',
      team2_name: 'Golden Racket',
      date: '2025-01-25T19:00:00',
      type: 'padel',
      location: 'Padel Center Norte'
    },
    {
      competition_id: 1,
      team1_name: 'Topspin United',
      team2_name: 'Baseline Kings',
      date: '2025-01-24T20:00:00',
      type: 'tennis',
      location: 'Real Club de Tenis'
    },

    {
      competition_id: 2,
      team1_name: 'Red Net Padel',
      team2_name: 'Vibora Team',
      date: '2025-01-27T21:00:00',
      type: 'padel',
      location: 'Urban Padel Club'
    },
    {
      competition_id: 3,
      team1_name: 'Match Point',
      team2_name: 'Deuce Squad',
      date: '2025-01-29T18:00:00',
      type: 'tennis',
      location: 'Complejo Deportivo Municipal'
    }
  ];



  getGameImage(type: string): string {
    switch (type) {
      case 'tennis':
        return 'assets/images/sports/tennis/tennis-field-1.jpeg';
      case 'padel':
        return 'assets/images/sports/padel/padel-field-1.jpeg';
      default:
        return 'assets/images/default-field.jpeg';
    }
  }

}
