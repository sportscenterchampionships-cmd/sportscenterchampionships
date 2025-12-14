import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../core/supabase.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    private supabase: SupabaseService
  ) {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
  }

  loginWithGoogle() {
    this.supabase.signInWithGoogle();
  }
}
