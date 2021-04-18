import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input() product;
  @Input() shoppingCart;

  constructor(public cartService: ShoppingCartService) {}
}
