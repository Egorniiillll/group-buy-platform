import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../../../shared/models/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private readonly apiUrl = 'http://localhost:3000/items';
  constructor(private http: HttpClient) {}

  getByOrderId(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}?orderId=${orderId}`);
  }
}
