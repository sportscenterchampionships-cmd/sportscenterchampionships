import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';

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

    const { error } = await this.supabase.signInWithEmail(
      this.email,
      this.password
    );

    this.loading = false;

    if (error) {
      this.error = error.message;
    }
  }

  async loginWithGoogle() {
    await this.supabase.signInWithGoogle();
  }

  goToOnboarding() {
    this.router.navigate(['/user_onboarding']);
  }
}
