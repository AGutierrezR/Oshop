import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CheckOutComponent } from '@shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from '@shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from '@shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from '@shopping/components/products/products.component';
import { ShippingFormComponent } from '@shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from '@shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from '@shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from '@shopping/shopping-routing.module';
import { OrderDetailComponent } from '../shared/components/order-detail/order-detail.component';
import { OrderGeneralComponent } from '../shared/components/order-detail/order-general/order-general.component';
import { OrderSummaryComponent } from '../shared/components/order-detail/order-summary/order-summary.component';

@NgModule({
  imports: [SharedModule, ShoppingRoutingModule],
  declarations: [
    ProductFilterComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailComponent,
    OrderSummaryComponent,
    OrderGeneralComponent,
  ],
})
export class ShoppingModule {}
