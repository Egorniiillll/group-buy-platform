import { Routes } from '@angular/router';
import { LoginPage } from './core/auth/login-page/login-page';
import { OrdersPage } from './features/orders/pages/orders-page/orders-page';
import { CreateOrderPage } from './features/orders/pages/create-order-page/create-order-page';
import { OrderDetailsPage } from './features/orders/pages/order-details-page/order-details-page';
import { authGuard } from './core/auth/guards/auth-guard';
import {HistoryPage} from './features/history/pages/history-page/history-page';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'orders',
    component: OrdersPage,
    canActivate: [authGuard],
  },
  {
    path: 'orders/create',
    component: CreateOrderPage,
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    component: OrderDetailsPage,
    canActivate: [authGuard],

  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'history',
    component: HistoryPage,
    canActivate: [authGuard],
  },
];
