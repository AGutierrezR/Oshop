import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product;
  @Input() showActions = true;
  @Input() shoppingCart;

  constructor(public cartService: ShoppingCartService) {}

  getQuantity(): number {
    if (!this.shoppingCart || !this.shoppingCart.items) {
      return 0;
    }
    const item = this.shoppingCart.items[this.product.$key];
    console.log(item);
    return item ? item.quantity : 0;
  }
}
