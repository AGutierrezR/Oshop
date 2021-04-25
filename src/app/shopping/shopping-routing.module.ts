import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CheckOutComponent } from '@shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from '@shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from '@shopping/components/order-success/order-success.component';
import { ProductsComponent } from '@shopping/components/products/products.component';
import { ShoppingCartComponent } from '@shopping/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'my-orders/:id',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
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
})
export class ShoppingRoutingModule {}
