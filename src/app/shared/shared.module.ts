import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from '@shared/components/product-quantity/product-quantity.component';
import { NgModelStatusDirective } from '@shared/directive/ng-model-status.directive';
import { MinDirective } from '@shared/validators/min/min.directive';
import { UrlDirective } from '@shared/validators/url/url.directive';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    NgModelStatusDirective,
    MinDirective,
    UrlDirective,
    OrderListComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    NgModelStatusDirective,
    MinDirective,
    UrlDirective,

    // Modules
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
