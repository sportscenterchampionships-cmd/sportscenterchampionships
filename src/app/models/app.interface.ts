export interface SportCard {
  key: string;
  name: string;
  image: string;
  color: string;
  selected: boolean;
  level?: string;
  disabled?: boolean;
}

export type Gender = 'male' | 'female' | 'mixed';

export type GameType = 'league' | 'tournament' | 'friendly';

export type CompetitionType = 'league' | 'tournament';

export interface Team {
  id: number;
  name: string;
  sport_id: number;
  image?: string | null;
  gender?: Gender | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: number | null;
  updated_by?: number | null;
}

export interface TeamCard {
  id: number;
  name: string;
  sport_id: number;
  sport_name: string;
  image?: string | null;
  gender?: Gender | null;
}

export interface Game {
  id: number;
  competition_id?: number | null;
  team1_id?: number | null;
  team2_id?: number | null;
  date?: string | null;
  type?: GameType | null;
  level?: number | null;
  result?: string | null;
  winner_team_id?: number | null;
  week_index?: number | null;
  created_at: string;
}

export interface GameCard {
  id: number;
  date?: string | null;
  type?: GameType | null;
  sport_id?: string | null;
  sport_name?: string | null;
  location?: string | null;
  level?: number | null;
  team1: TeamCard | null;
  team2: TeamCard | null;
  status?: 'scheduled' | 'pending' | 'completed';
  result?: string | null; // e.g., "6-4, 3-6, 7-6" for tennis, "6-2" for padel
  competition_id?: number | null;
}

export interface CompetitionCard {
  id: number;
  name: string;
  image?: string | null;
  sport_id: number;
  sport_name: string;
  type?: CompetitionType | null;
  level?: number | null;
  start_date?: string | null;
  location?: string | null;
  is_open: boolean;
  is_private?: boolean; // requiere código para unirse
}

export interface UserDashboardData {
  teams: TeamCard[];
  games: GameCard[];
  competitions: CompetitionCard[];
}

export interface SportCenter {
  id?: number;
  name: string;
  google_maps_url: string;
  address: string;
  city: string;
  phone: string;
  website: string;
}

export interface SportCenterZone {
  id: number;
  sport_center_id: number;
  name: string;
  type?: string; // pista cubierta, exterior, etc.
}

export type SportsCenterFilter = {
  q?: string;
  city?: string;
};

// Define interfaces for day availability and time ranges
export interface TimeRange {
  start: string | null;
  end: string | null;
}

export interface DayAvailability {
  key: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  label: string;
  enabled: boolean;
  morning: TimeRange;
  afternoon: TimeRange;
}

// Competition model (align with suggested fields and DB schema)
export interface Competition {
  id?: number;
  sport_id: number | null;
  name: string;
  type: number | null; // 1: Liga, 2: Torneo
  level: number | null;
  min_teams: number | null;
  max_teams: number | null;
  min_players_per_team: number | null;
  max_players_per_team: number | null;
  start_date: string | null; // YYYY-MM-DD
  end_date: string | null; // YYYY-MM-DD
  // registration_open_at: string | null; // YYYY-MM-DD
  // registration_close_at: string | null; // YYYY-MM-DD
  location: number | null;
  timezone: string | null;
  organizer_name: string | null;
  organizer_email: string | null;
  organizer_phone: string | null;
  is_open: boolean; // inscripción pública
  status: 'en_espera' | 'iniciada' | 'finalizada';
  back_to_back: boolean | null; // ida y vuelta
  allow_draws: boolean;
  points_win: number;
  points_draw: number;
  points_loss: number;
  fee_amount: number | null;
  fee_currency: string | null;
  description: string | null;
  rules_url: string | null;
  prizes: string | null;
  banner_url: string | null;
  is_public: boolean; // visibilidad
  is_private?: boolean; // privada: requiere código de acceso
  access_code?: string | null; // código de 6 cifras
}
