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
  sport_name: number;
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

export interface GameWithTeams {
  id: number;
  date?: string | null;
  type?: GameType | null;
  level?: number | null;

  team1: TeamCard | null;
  team2: TeamCard | null;

  competition_id?: number | null;
}

export interface Competition {
  id: number;
  sport_id: number;
  name: string;
  type?: CompetitionType | null;
  level?: number | null;
  min_teams?: number | null;
  max_teams?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  location?: string | null;
  is_open: boolean;
  status: string;
  created_at: string;
  updated_at?: string | null;
}

export interface CompetitionCard {
  id: number;
  name: string;
  sport_id: number;
  sport_name: number;
  type?: CompetitionType | null;
  level?: number | null;
  start_date?: string | null;
  location?: string | null;
  is_open: boolean;
}

export interface UserDashboardData {
  teams: TeamCard[];
  games: GameWithTeams[];
  competitions: CompetitionCard[];
}

