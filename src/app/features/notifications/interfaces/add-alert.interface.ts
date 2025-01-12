export interface AddAlert {
  token: string;
  target_price: number;
  direction: 'above' | 'below';
  active?: boolean;
  is_triggered?: boolean;
}
