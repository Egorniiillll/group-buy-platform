import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order';
import { GroupOrder } from '../../../../shared/models/model';

@Component({
  selector: 'app-orders-page',
  imports: [RouterLink],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage implements OnInit {
  orders: GroupOrder[] = [];
  loading = true;
  error = '';

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось загрузить заказы';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
