import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../services/core/supabase.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout();
  }

  loginWithGoogle() {
    this.supabase.signInWithGoogle();
  }
}
