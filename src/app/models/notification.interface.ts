export interface AppNotification {
  id: number;
  title: string;
  description: string;
  createdAt: string; // ISO date string
  type?: 'info' | 'success' | 'warning' | 'error';
  read?: boolean;
}
