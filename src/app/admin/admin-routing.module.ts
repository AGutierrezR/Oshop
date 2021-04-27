import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from '@admin/components/product-form/product-form.component';
import { AdminOrdersResolver } from '@admin/services/admin-orders.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@core/guards/admin-auth.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { OrderResolver } from '@core/resolvers/order.resolver';
import { OrderDetailComponent } from '@shared/components/order-detail/order-detail.component';
import { OrderListComponent } from '@shared/components/order-list/order-list.component';

const routes: Routes = [
  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    resolve: { orders: AdminOrdersResolver },
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    resolve: { order: OrderResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminOrdersResolver],
})
export class AdminRoutingModule {}
