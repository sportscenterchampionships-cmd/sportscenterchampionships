import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SportsCenterFormComponent } from './pages/sports-center-form/sports-center-form.component';
import { TeamFormComponent } from './pages/team-form/team-form.component';
import { CompetitionFormComponent } from './pages/competition-form/competition-form.component';
import { ClassificationComponent } from './pages/classification/classification.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sports-center', component: SportsCenterFormComponent },
  { path: 'team', component: TeamFormComponent },
  { path: 'competition', component: CompetitionFormComponent },
  { path: 'classification/:id', component: ClassificationComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
