import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-create-order-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-order-page.html',
  styleUrl: './create-order-page.css',
})
export class CreateOrderPage {
  title = '';
  description = '';
  totalPrice: number | null = null;
  error = '';
  constructor(
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  createOrder(): void {
    if (!this.title.trim()) {
      this.error = 'введите название заказа';
      return;
    }
    if (!this.description.trim()) {
      this.error = 'введите описание заказа';
      return;
    }
    if (this.totalPrice === null || this.totalPrice <= 0) {
      this.error = 'введите сумму больше 0';
      return;
    }
    this.orderService
      .create({
        title: this.title,
        description: this.description,
        status: 'OPEN',
        totalPrice: this.totalPrice,
        createdAt: new Date().toISOString().slice(0, 10),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: () => {
          this.error = 'не удалось создать заказ';
          this.cdr.markForCheck();
        },
      });
  }
}
