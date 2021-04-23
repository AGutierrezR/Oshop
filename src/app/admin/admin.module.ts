import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { AdminOrdersComponent } from '@admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from '@admin/components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
})
export class AdminModule {}
