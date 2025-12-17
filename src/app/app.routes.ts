import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserOnboardingComponent } from './pages/user-onboarding/user-onboarding.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'user_onboarding', component: UserOnboardingComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
