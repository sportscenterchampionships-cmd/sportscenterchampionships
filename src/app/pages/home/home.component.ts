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
}
