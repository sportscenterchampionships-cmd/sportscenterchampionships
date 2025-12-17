import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserOnboardingComponent } from './pages/user-onboarding/user-onboarding.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'user_onboarding', component: UserOnboardingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '',
  },
];
