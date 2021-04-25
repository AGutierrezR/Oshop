import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '@core/services/shopping-cart.service';

export enum ProductQuantityMode {
  Normal,
  JustQuantity,
}

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input() product;
  @Input() shoppingCart;
  @Input() mode = ProductQuantityMode.Normal;

  get quantity(): string {
    const quantity = this.shoppingCart.getQuantity(this.product);
    if (this.mode === ProductQuantityMode.Normal) {
      return `${quantity} in cart`;
    }
    return quantity;
  }

  constructor(public cartService: ShoppingCartService) {}
}
