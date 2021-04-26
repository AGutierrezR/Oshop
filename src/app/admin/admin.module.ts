import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminOrdersComponent } from '@admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from '@admin/components/product-form/product-form.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
})
export class AdminModule {}
