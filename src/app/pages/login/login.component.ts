import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/core/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async loginWithEmail() {
    this.loading = true;
    this.error = null;

    const { data, error } = await this.supabase.signInWithEmail(
      this.email,
      this.password
    );

    this.loading = false;

    if (error) {
      this.error = error.message;
    } else if (data?.user) {
      // Redirige al dashboard si login OK
      this.router.navigate(['/dashboard']);
    }
  }

  async loginWithGoogle() {
    const { data, error } = await this.supabase.signInWithGoogle();

    if (error) {
      this.error = error.message;
    } else if (data?.url) {
      // Redirige al dashboard si login OK
      this.router.navigate(['/dashboard']);
    }
  }

  goToOnboarding() {
    this.router.navigate(['/user_onboarding']);
  }
}
