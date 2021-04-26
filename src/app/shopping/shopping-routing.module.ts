import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { OrderResolver } from '@core/resolvers/order.resolver';
import { OrderDetailComponent } from '@shared/components/order-detail/order-detail.component';
import { OrderListComponent } from '@shared/components/order-list/order-list.component';
import { CheckOutComponent } from '@shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from '@shopping/components/order-success/order-success.component';
import { ProductsComponent } from '@shopping/components/products/products.component';
import { ShoppingCartComponent } from '@shopping/components/shopping-cart/shopping-cart.component';
import { OrdersResolver } from '@shopping/services/orders.resolver';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
    resolve: { orders: OrdersResolver },
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
    resolve: { order: OrderResolver },
  },
  { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrdersResolver],
})
export class ShoppingRoutingModule {}
