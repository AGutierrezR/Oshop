import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrdersComponent } from 'src/app/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/admin-products/admin-products.component';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MyOrdersComponent } from 'src/app/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'src/app/order-success/order-success.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
