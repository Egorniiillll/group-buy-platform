import { Injectable, signal } from '@angular/core';
import { GroupOrder } from '../../../shared/models/model';

@Injectable({
  providedIn: 'root',
})
export class OrdersStore {
  readonly orders = signal<GroupOrder[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  setOrders(orders: GroupOrder[]): void {
    this.orders.set(orders);
  }
  addOrder(order: GroupOrder): void {
    this.orders.update((orders) => [...orders, order]);
  }

  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }


  setError(error: string): void {
    this.error.set(error);
  }
}
