import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupOrder} from '../../../shared/models/model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private readonly apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<GroupOrder[]> {
    return this.http.get<GroupOrder[]>(this.apiUrl);
  }

  getById(id: string): Observable<GroupOrder> {
    return this.http.get<GroupOrder>(`${this.apiUrl}/${id}`);
  }

  create(order: Omit<GroupOrder, 'id'>): Observable<GroupOrder> {
    return this.http.post<GroupOrder>(this.apiUrl, order);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
