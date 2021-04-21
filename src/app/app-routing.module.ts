import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/admin-auth-guard.service';
import { AdminOrdersComponent } from 'src/app/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/admin-products/admin-products.component';
import { ProductFormComponent } from 'src/app/admin/product-form/product-form.component';
import { AuthGuard } from 'src/app/auth-guard.service';
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

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
