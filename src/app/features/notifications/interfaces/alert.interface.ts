export interface Alert {
  id: number;
  token: string;
  target_price: number;
  direction: 'above' | 'below',
  user_id: string;
  active: boolean;
  is_triggered: boolean;
  created_at: Date;
}