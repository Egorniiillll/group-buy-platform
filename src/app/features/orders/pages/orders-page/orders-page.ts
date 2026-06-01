import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { OrderService } from '../../services/order';
import { GroupOrder } from '../../../../shared/models/model';
import { AuthService } from '../../../../core/auth/services/auth';
import { OrdersStore } from '../../store/orders.store';

@Component({
  selector: 'app-orders-page',
  imports: [RouterLink, FormsModule, TuiButton],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage implements OnInit {
  searchText = '';
  statusFilter: 'ALL' | 'OPEN' | 'CLOSED' = 'ALL';
  sortType: 'NONE' | 'PRICE_ASC' | 'PRICE_DESC' = 'NONE';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    public ordersStore: OrdersStore,
  ) {}

  ngOnInit(): void {
    this.ordersStore.setLoading(true);

    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.ordersStore.setOrders(orders);
        this.ordersStore.setLoading(false);
      },
      error: () => {
        this.ordersStore.setError('не удалось загрузить заказы');
        this.ordersStore.setLoading(false);
      },
    });
  }

  getFilteredOrders(): GroupOrder[] {
    let result = this.ordersStore.orders().filter((order) => {
      const matchesSearch = order.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.statusFilter === 'ALL' || order.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (this.sortType === 'PRICE_ASC') {
      result = result.sort((a, b) => a.totalPrice - b.totalPrice);
    }

    if (this.sortType === 'PRICE_DESC') {
      result = result.sort((a, b) => b.totalPrice - a.totalPrice);
    }

    return result;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
