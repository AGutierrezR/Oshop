import { Component, Input } from '@angular/core';
import { Product } from '@models/product';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product;
  @Input() showActions = true;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product): void {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.cartService.create('cartId').then(() => {
        // Add product to cart
      });
    } else {
      // Add product to cart
    }
  }
}
