export interface GroupOrder {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED';
  totalPrice: number;
  createdAt: string;
}
