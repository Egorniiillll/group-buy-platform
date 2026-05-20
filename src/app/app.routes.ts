import { Routes } from '@angular/router';
import { LoginPage } from './core/auth/login-page/login-page';
import { OrdersPage } from './features/orders/pages/orders-page/orders-page';
import { CreateOrderPage } from './features/orders/pages/create-order-page/create-order-page';
import { OrderDetailsPage } from './features/orders/pages/order-details-page/order-details-page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'orders',
    component: OrdersPage,
  },
  {
    path: 'orders/create',
    component: CreateOrderPage,
  },
  {
    path: 'orders/:id',
    component: OrderDetailsPage,
  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
];
