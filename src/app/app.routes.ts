import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SportsCenterFormComponent } from './pages/sports-center-form/sports-center-form.component';
import { TeamFormComponent } from './pages/team-form/team-form.component';
import { CompetitionFormComponent } from './pages/competition-form/competition-form.component';
import { ClassificationComponent } from './pages/classification/classification.component';
import { TeamJoinComponent } from './pages/team-join/team-join.component';
import { CompetitionJoinComponent } from './pages/competition-join/competition-join.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { GameComponent } from './pages/game/game.component';
import { GamesListComponent } from './pages/games-list/games-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent, data: { backTo: '/dashboard' } },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'login', component: LoginComponent, data: { backTo: '/' } },
  { path: 'sports-center', component: SportsCenterFormComponent, data: { backTo: '/dashboard' } },
  { path: 'team', component: TeamFormComponent, data: { backTo: '/dashboard' } },
  { path: 'team/join', component: TeamJoinComponent, data: { backTo: '/dashboard' } },
  { path: 'competition', component: CompetitionFormComponent, data: { backTo: '/dashboard' } },
  { path: 'competition/join', component: CompetitionJoinComponent, data: { backTo: '/dashboard' } },
  { path: 'classification/:id', component: ClassificationComponent },
  { path: 'notifications', component: NotificationsComponent, data: { backTo: '/dashboard' } },
  { path: 'game', component: GameComponent },
  { path: 'games', component: GamesListComponent, data: { backTo: '/dashboard' } },
  { path: '**', redirectTo: '' },
];
