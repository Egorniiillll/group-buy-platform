import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { OrderItem } from '../../../shared/models/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private readonly apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  getByOrderId(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl).pipe(
      map((items) => items.filter((item) => String(item.orderId) === orderId)),
    );
  }

  create(item: Omit<OrderItem, 'id'>): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.apiUrl, item);
  }
}
