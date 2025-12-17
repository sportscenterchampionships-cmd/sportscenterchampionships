import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sb = inject(SupabaseService);
  constructor() { }

  async createUser(profile: {
    name: string;
    email: string;
    avatar_url?: string;
    language?: string;
    birth_date?: string;
    gender?: string;
    position?: string;
    notifications?: boolean;
    city?: string;
    zone?: string;
  }) {
    const user = await this.sb.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await this.sb.supabase
      .from('users')
      .insert({
        id: user.id,
        ...profile,
      });

    if (error) throw error;
  }

  async updateUser(profile: Partial<{
    name: string;
    avatar_url: string;
    language: string;
    birth_date: string;
    gender: string;
    position: string;
    notifications: boolean;
    city: string;
    zone: string;
  }>) {
    const user = await this.sb.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await this.sb.supabase
      .from('users')
      .update(profile)
      .eq('id', user.id);

    if (error) throw error;
  }

  async deleteUserProfile() {
    const user = await this.sb.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await this.sb.supabase
      .from('users')
      .delete()
      .eq('id', user.id);

    if (error) throw error;
  }

  async getUserTeams(userId: number) {
    return this.sb.supabase
      .from('teams')
      .select('id, name, image, gender')
      .eq('active', true);
  }

  async getUpcomingGames() {
    return this.sb.supabase
      .from('games')
      .select(`
        id,
        date,
        type,
        team1:team1_id ( id, name, image ),
        team2:team2_id ( id, name, image )
      `)
      .order('date', { ascending: true });
  }




}
