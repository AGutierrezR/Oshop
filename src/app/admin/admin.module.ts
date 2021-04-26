import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from '@admin/components/product-form/product-form.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [AdminProductsComponent, ProductFormComponent],
})
export class AdminModule {}
