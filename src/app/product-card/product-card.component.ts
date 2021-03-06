import { Component, Input } from '@angular/core';
import { ShoppingCart } from '@models/shopping-cart';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(public cartService: ShoppingCartService) {}
}
