import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../orders/services/order';
import { GroupOrder } from '../../../../shared/models/model';

@Component({
  selector: 'app-history-page',
  imports: [RouterLink],
  templateUrl: './history-page.html',
  styleUrl: './history-page.css',
})
export class HistoryPage implements OnInit {
  orders: GroupOrder[] = [];
  loading = true;
  error = '';
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders.filter((order) => order.status === 'CLOSED');
        this.loading = false;
      },
      error: () => {
        this.error = 'не удалось загрузить историю';
        this.loading = false;
      },
    });
  }
}
