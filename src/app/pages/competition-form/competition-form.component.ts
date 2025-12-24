import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Competition, SportCenter, SportCenterZone } from '../../models/app.interface';
import { SupabaseService } from '../../services/core/supabase.service';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SportCenterComponent } from '../../components/sport-center/sport-center.component';

@Component({
  selector: 'app-competition-form',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent, SportCenterComponent],
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.css'],
})
export class CompetitionFormComponent {

  supabase = inject(SupabaseService)
  private router = inject(Router);

  // Form state
  competition: Competition = {
    sport_id: null,
    name: '',
    type: null,
    level: null,
    min_teams: null,
    max_teams: null,
    min_players_per_team: null,
    max_players_per_team: null,
    start_date: null,
    end_date: null,
    // registration_open_at: null,
    // registration_close_at: null,
    location: null,
    timezone: 'Europe/Madrid',
    organizer_name: '',
    organizer_email: '',
    organizer_phone: '',
    is_open: true,
    status: 'en_espera',
    back_to_back: false,
    allow_draws: true,
    points_win: 3,
    points_draw: 1,
    points_loss: 0,
    fee_amount: null,
    fee_currency: 'EUR',
    description: '',
    rules_url: '',
    prizes: '',
    banner_url: '',
    is_public: true,
    is_private: false,
    access_code: null,
  };

  saving = false;
  error: string | null = null;
  success: boolean = false;

  selectedCenter?: SportCenter;
  selectedZone?: SportCenterZone | null;

  ngOnInit() {
    // If navigated with router state containing a competition, prefill the form
    const state = this.router.getCurrentNavigation()?.extras?.state as { competition?: any } | undefined;
    const comp = state?.competition;
    if (comp) {
      // Map basic card fields to the form model where applicable
      this.competition = {
        ...this.competition,
        id: comp.id,
        sport_id: comp.sport_id ?? null,
        name: comp.name ?? '',
        type: comp.type ?? null,
        level: comp.level ?? null,
        start_date: comp.start_date ?? null,
        location: comp.location ?? null,
        is_open: comp.is_open ?? true,
        is_private: comp.is_private ?? false,
      };
    }
  }

  onCenterZoneSelected(sel: { center: SportCenter; zone: SportCenterZone | null }) {
    this.selectedCenter = sel.center;
    this.selectedZone = sel.zone;
    // Guardamos en "location" el id de la zona si existe; en su defecto, el id del centro
    this.competition.location = (sel.zone?.id ?? sel.center.id) ?? null;
  }

  // Save competition (create or update)
  async save() {
    this.error = null;
    this.success = false;
    this.saving = true;
    try {
      const supabase = this.supabase.client;
      const payload = { ...this.competition } as any;

      // If not private, clear any code
      if (!payload.is_private) {
        payload.access_code = null;
      }

      // Validate private code: exactly 6 digits
      if (payload.is_private) {
        const code = String(payload.access_code ?? '').trim();
        if (!/^\d{6}$/.test(code)) {
          throw new Error('Introduce un código de acceso de 6 cifras');
        }
        payload.access_code = code;
      }

      // Convert empty strings to null for optional fields
      Object.keys(payload).forEach((k) => {
        if (payload[k] === '') payload[k] = null;
      });

      if (this.competition.id) {
        const { error } = await supabase
          .from('competitions')
          .update(payload)
          .eq('id', this.competition.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('competitions')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        this.competition.id = data.id;
      }

      this.success = true;
    } catch (e: any) {
      this.error = e?.message || 'Error al guardar';
    } finally {
      this.saving = false;
    }
  }
}
