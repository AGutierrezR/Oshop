import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MyOrdersComponent } from 'src/app/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'src/app/order-success/order-success.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
