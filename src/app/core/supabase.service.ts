import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      'https://xnhkyqflvfqjbmcbzzct.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaGt5cWZsdmZxamJtY2J6emN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDE5NDUsImV4cCI6MjA4MDk3Nzk0NX0.0Wjj_6kClOznswEo2hijdOf9XQ75WwfhkeWXRfEw9jI'
    );
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/sportscenterchampionships/',
      }
    });
    // https://xnhkyqflvfqjbmcbzzct.supabase.co/auth/v1/callback
  }

  get client() {
    return this.supabase;
  }
}
