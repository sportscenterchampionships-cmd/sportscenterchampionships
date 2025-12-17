import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../enviroments/enviromen.prod';

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

  signInWithEmail(email: string, password: string) {
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

  getUser(): Promise<User | null> {
    return this.supabase.auth.getUser().then(res => res.data.user);
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/sportscenterchampionships/',
      },
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getPublicAvatarUrl(path: string) {
    return this.supabase.storage
      .from('avatars')
      .getPublicUrl(path).data.publicUrl;
  }

  async uploadAvatar(file: File) {
    const user = await this.getUser();
    if (!user) throw new Error('User not authenticated');

    const filePath = `avatars/${user.id}.jpg`;

    const { error } = await this.supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }



}
