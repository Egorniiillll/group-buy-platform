import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { GroupOrder } from '../../../../shared/models/model';
import { AuthService } from '../../../../core/auth/services/auth';

@Component({
  selector: 'app-orders-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage implements OnInit {
  orders: GroupOrder[] = [];
  loading = true;
  error = '';



  searchText = '';
  statusFilter: 'ALL' | 'OPEN' | 'CLOSED' = 'ALL';
  sortType: 'NONE' | 'PRICE_ASC' | 'PRICE_DESC' = 'NONE';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.error = 'не удалось загрузить заказы';
        this.loading = false;
      },
    });
  }

  getFilteredOrders(): GroupOrder[] {
    let result = this.orders.filter((order) => {
      const matchesSearch = order.title
        .toLowerCase().includes(this.searchText.toLowerCase());
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
