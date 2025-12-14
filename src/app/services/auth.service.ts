import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../core/supabase.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<any>(null);
  user$ = this._user$.asObservable();

  constructor(public sb: SupabaseService, protected router: Router) {
    // Detectar sesión activa
    this.sb.supabase.auth.getSession().then(({ data }) => {
      this._user$.next(data.session?.user ?? null);
    });

    // Escuchar cambios de auth (login / logout)
    this.sb.supabase.auth.onAuthStateChange(async (_event, session) => {
      this._user$.next(session?.user ?? null);
      console.log(session?.user);
      if (session?.user) {
        const { data } = await this.sb.supabase
          .from('users')
          .select('mail')
          .eq('mail', this._user$.value.email)
          .single();

        if (data) {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/user-onboarding']);
        }
      }
    });
  }

  async logout() {
    await this.sb.supabase.auth.signOut();
  }
}
