export interface GroupOrder {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED';
  totalPrice: number;
  createdAt: string;

}
