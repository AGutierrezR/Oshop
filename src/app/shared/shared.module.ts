import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from '@shared/components/product-quantity/product-quantity.component';
import { NgModelStatusDirective } from '@shared/directive/ng-model-status.directive';
import { MinDirective } from '@shared/validators/min/min.directive';
import { UrlDirective } from '@shared/validators/url/url.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    NgModelStatusDirective,
    MinDirective,
    UrlDirective,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    NgModelStatusDirective,
    MinDirective,
    UrlDirective,
  ],
})
export class SharedModule {}
